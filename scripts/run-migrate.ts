import { getPayload } from 'payload'

async function main() {
  const imported = await import('../payload.config.ts')
  const config = await imported.default

  // eslint-disable-next-line no-console
  console.log('Initializing Payload...')

  const payload = await getPayload({ config })

  // eslint-disable-next-line no-console
  console.log('Creating migration...')

  await payload.db.migrationDir

  // Create tables via push (no migration files needed)
  // eslint-disable-next-line no-console
  console.log('Pushing schema to database...')

  // @ts-ignore - drizzle push
  if (payload.db.push) {
    await payload.db.push({ payload })
  } else {
    // eslint-disable-next-line no-console
    console.log('Push not available, running migrate instead...')
    await payload.db.migrate()
  }

  // eslint-disable-next-line no-console
  console.log('Schema pushed successfully')

  process.exit(0)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Migration failed:', err)
  process.exit(1)
})
