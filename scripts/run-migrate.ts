import { getPayload } from 'payload'

async function main() {
  const imported = await import('../payload.config')
  const config = await imported.default

  // eslint-disable-next-line no-console
  console.log('Initializing Payload...')

  const payload = await getPayload({ config })

  // eslint-disable-next-line no-console
  console.log('Running migrations...')

  await payload.db.migrate()

  // eslint-disable-next-line no-console
  console.log('Migrations completed successfully')

  process.exit(0)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Migration failed:', err)
  process.exit(1)
})
