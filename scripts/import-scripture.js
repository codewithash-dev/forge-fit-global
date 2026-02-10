#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INPUT_PATH = process.argv[2];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

if (!INPUT_PATH) {
  console.error('Usage: npm run import:scripture -- <path-to.csv|json>');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const loadEntries = (filePath) => {
  const absPath = path.resolve(filePath);
  const ext = path.extname(absPath).toLowerCase();
  const raw = fs.readFileSync(absPath, 'utf8');

  if (ext === '.json') {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object') {
      return Object.entries(data).map(([ref, text]) => ({
        ref,
        text
      }));
    }
    throw new Error('JSON must be an array or an object of verse refs');
  }

  if (ext === '.csv') {
    return parse(raw, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  }

  throw new Error('Unsupported file type. Use .csv or .json');
};

const parseRef = (ref) => {
  const match = String(ref).match(/^(.*)\s(\d+):(\d+)$/);
  if (!match) return null;
  return {
    book: match[1],
    chapter: Number(match[2]),
    verse: Number(match[3])
  };
};

const normalizeEntry = (row) => {
  if (row.ref && row.text) {
    const parsed = parseRef(row.ref);
    if (!parsed) return null;
    return {
      ...parsed,
      text: row.text,
      source: row.source ?? row.Source ?? 'KJV'
    };
  }

  return {
    book: row.book ?? row.Book,
    chapter: Number(row.chapter ?? row.Chapter),
    verse: Number(row.verse ?? row.Verse),
    text: row.text ?? row.Text,
    source: row.source ?? row.Source ?? 'KJV'
  };
};

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

(async () => {
  try {
    const rawEntries = loadEntries(INPUT_PATH);
    const entries = rawEntries.map(normalizeEntry).filter((row) => row && row.book && row.text);

    console.log(`Loaded ${entries.length} entries. Uploading...`);

    const batches = chunk(entries, 500);
    for (let i = 0; i < batches.length; i += 1) {
      const batch = batches[i];
      const { error } = await supabase.from('scripture_entries').insert(batch);
      if (error) {
        throw error;
      }
      console.log(`Uploaded batch ${i + 1}/${batches.length}`);
    }

    console.log('Done.');
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
})();
