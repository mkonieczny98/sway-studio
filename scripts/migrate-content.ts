import { getPayload } from 'payload'
import * as fs from 'fs'
import * as path from 'path'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

function readJson(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e)
    return null
  }
}

function readDir(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath).filter(f => f.endsWith('.json'))
  } catch (e) {
    return []
  }
}

async function main() {
  const imported = await import('../payload.config')
  const config = await imported.default

  console.log('🚀 Initializing Payload...')
  const payload = await getPayload({ config })

  console.log('📦 Starting content migration from Keystatic files...\n')

  // ========== GLOBALS ==========

  // 1. Settings
  console.log('⚙️  Migrating Settings...')
  const settingsData = readJson(path.join(CONTENT_DIR, 'settings.json'))
  if (settingsData) {
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        siteName: settingsData.siteName,
        email: settingsData.email,
        phone: settingsData.phone,
        address: settingsData.address,
        nip: settingsData.nip,
        companyName: settingsData.companyName,
        fitssey: settingsData.fitssey,
        facebook: settingsData.facebook,
        instagram: settingsData.instagram,
      },
    })
    console.log('   ✅ Settings migrated')
  }

  // 2. Homepage
  console.log('🏠 Migrating Homepage...')
  const homepageData = readJson(path.join(CONTENT_DIR, 'homepage.json'))
  if (homepageData) {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroSection: {
          title: homepageData.heroSection?.title,
          highlight: homepageData.heroSection?.highlight,
          subtitle: homepageData.heroSection?.subtitle,
          description: homepageData.heroSection?.description,
          buttonText: homepageData.heroSection?.buttonText,
          colors: homepageData.heroSection?.colors,
        },
        aboutSection: {
          title: homepageData.aboutSection?.title,
          text: homepageData.aboutSection?.text,
          feature1: homepageData.aboutSection?.feature1,
          feature2: homepageData.aboutSection?.feature2,
          feature3: homepageData.aboutSection?.feature3,
          colors: homepageData.aboutSection?.colors,
        },
        promoSection: {
          title: homepageData.promoSection?.title,
          price: homepageData.promoSection?.price,
          description: homepageData.promoSection?.description,
          buttonText: homepageData.promoSection?.buttonText,
          colors: homepageData.promoSection?.colors,
        },
        voucherSection: {
          title: homepageData.voucherSection?.title,
          text: homepageData.voucherSection?.text,
          buttonText: homepageData.voucherSection?.buttonText,
          colors: homepageData.voucherSection?.colors,
        },
        locationSection: {
          title: homepageData.locationSection?.title,
          address: homepageData.locationSection?.address,
          parking: homepageData.locationSection?.parking,
          transport: homepageData.locationSection?.transport,
          colors: homepageData.locationSection?.colors,
        },
        ctaSection: {
          title: homepageData.ctaSection?.title,
          text: homepageData.ctaSection?.text,
          buttonText: homepageData.ctaSection?.buttonText,
          colors: homepageData.ctaSection?.colors,
        },
        classCardsColors: homepageData.classCardsColors,
        pricingCardsColors: homepageData.pricingCardsColors,
        testimonialsColors: homepageData.testimonialsColors,
      },
    })
    console.log('   ✅ Homepage migrated')
  }

  // 3. Navigation
  console.log('🧭 Migrating Navigation...')
  const navData = readJson(path.join(CONTENT_DIR, 'navigation.json'))
  if (navData) {
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        menuItems: navData.menuItems,
        ctaButtonText: navData.ctaButtonText,
      },
    })
    console.log('   ✅ Navigation migrated')
  }

  // 4. Footer
  console.log('📝 Migrating Footer...')
  const footerData = readJson(path.join(CONTENT_DIR, 'footer.json'))
  if (footerData) {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        description: footerData.description,
        copyright: footerData.copyright,
      },
    })
    console.log('   ✅ Footer migrated')
  }

  // 5. Zajecia Page
  console.log('📄 Migrating Zajecia Page...')
  const zajeciaPageData = readJson(path.join(CONTENT_DIR, 'zajecia-page.json'))
  if (zajeciaPageData) {
    await payload.updateGlobal({
      slug: 'zajecia-page',
      data: {
        heroTitle: zajeciaPageData.heroTitle,
        heroSubtitle: zajeciaPageData.heroSubtitle,
        groupClassesTitle: zajeciaPageData.groupClassesTitle,
        additionalTitle: zajeciaPageData.additionalTitle,
      },
    })
    console.log('   ✅ Zajecia Page migrated')
  }

  // 6. Cennik Page
  console.log('💰 Migrating Cennik Page...')
  const cennikPageData = readJson(path.join(CONTENT_DIR, 'cennik-page.json'))
  if (cennikPageData) {
    await payload.updateGlobal({
      slug: 'cennik-page',
      data: {
        heroTitle: cennikPageData.heroTitle,
        heroSubtitle: cennikPageData.heroSubtitle,
        categories: cennikPageData.categories,
        bankSection: cennikPageData.bankSection,
      },
    })
    console.log('   ✅ Cennik Page migrated')
  }

  // 7. FAQ Page
  console.log('❓ Migrating FAQ Page...')
  const faqPageData = readJson(path.join(CONTENT_DIR, 'faq-page.json'))
  if (faqPageData) {
    await payload.updateGlobal({
      slug: 'faq-page',
      data: {
        heroTitle: faqPageData.heroTitle,
        heroSubtitle: faqPageData.heroSubtitle,
        ctaText: faqPageData.ctaText,
      },
    })
    console.log('   ✅ FAQ Page migrated')
  }

  // 8. Kontakt Page
  console.log('📞 Migrating Kontakt Page...')
  const kontaktPageData = readJson(path.join(CONTENT_DIR, 'kontakt-page.json'))
  if (kontaktPageData) {
    await payload.updateGlobal({
      slug: 'kontakt-page',
      data: {
        heroTitle: kontaktPageData.heroTitle,
        heroSubtitle: kontaktPageData.heroSubtitle,
        hoursText: kontaktPageData.hoursText,
      },
    })
    console.log('   ✅ Kontakt Page migrated')
  }

  // 9. Regulamin Page
  console.log('📜 Migrating Regulamin Page...')
  const regulaminPageData = readJson(path.join(CONTENT_DIR, 'regulamin-page.json'))
  if (regulaminPageData) {
    await payload.updateGlobal({
      slug: 'regulamin-page',
      data: {
        heroTitle: regulaminPageData.heroTitle,
        heroSubtitle: regulaminPageData.heroSubtitle,
      },
    })
    console.log('   ✅ Regulamin Page migrated')
  }

  // ========== COLLECTIONS ==========

  // 10. Zajecia (Classes)
  console.log('\n🏋️ Migrating Zajecia collection...')
  const zajeciaDir = path.join(CONTENT_DIR, 'zajecia')
  const zajeciaFiles = readDir(zajeciaDir)
  for (const file of zajeciaFiles) {
    const data = readJson(path.join(zajeciaDir, file))
    if (data) {
      const slug = file.replace('.json', '')
      try {
        // Check if exists
        const existing = await payload.find({
          collection: 'zajecia',
          where: { slug: { equals: slug } },
        })
        
        const zajeciaData = {
          slug,
          title: data.title,
          shortDesc: data.shortDesc,
          fullDesc: data.fullDesc,
          image: data.image,
          imageOrientation: data.imageOrientation || 'horizontal',
          maxPeople: data.maxPeople,
          duration: data.duration,
          requirements: data.requirements,
          features: data.features?.map((f: string) => ({ feature: f })) || [],
          showOnHome: data.showOnHome ?? true,
          order: data.order || 1,
        }

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'zajecia',
            id: existing.docs[0].id,
            data: zajeciaData,
          })
        } else {
          await payload.create({
            collection: 'zajecia',
            data: zajeciaData,
          })
        }
        console.log(`   ✅ ${data.title}`)
      } catch (e) {
        console.error(`   ❌ Error migrating ${file}:`, e)
      }
    }
  }

  // 11. Karnety (Passes)
  console.log('\n🎫 Migrating Karnety collection...')
  const karnetyDir = path.join(CONTENT_DIR, 'karnety')
  const karnetyFiles = readDir(karnetyDir)
  for (const file of karnetyFiles) {
    const data = readJson(path.join(karnetyDir, file))
    if (data) {
      const slug = file.replace('.json', '')
      try {
        const existing = await payload.find({
          collection: 'karnety',
          where: { slug: { equals: slug } },
        })

        const karnetData = {
          slug,
          name: data.name,
          entries: data.entries,
          price: data.price,
          period: data.period,
          features: data.features?.map((f: string) => ({ feature: f })) || [],
          isPopular: data.isPopular ?? false,
          order: data.order || 1,
        }

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'karnety',
            id: existing.docs[0].id,
            data: karnetData,
          })
        } else {
          await payload.create({
            collection: 'karnety',
            data: karnetData,
          })
        }
        console.log(`   ✅ ${data.name}`)
      } catch (e) {
        console.error(`   ❌ Error migrating ${file}:`, e)
      }
    }
  }

  // 12. Opinie (Reviews)
  console.log('\n⭐ Migrating Opinie collection...')
  const opinieDir = path.join(CONTENT_DIR, 'opinie')
  const opinieFiles = readDir(opinieDir)
  for (const file of opinieFiles) {
    const data = readJson(path.join(opinieDir, file))
    if (data) {
      const slug = file.replace('.json', '')
      try {
        const existing = await payload.find({
          collection: 'opinie',
          where: { author: { equals: data.author } },
        })

        const opiniaData = {
          author: data.author,
          text: data.text,
          rating: data.rating || 5,
          source: data.source || 'Google',
          order: data.order || 1,
        }

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'opinie',
            id: existing.docs[0].id,
            data: opiniaData,
          })
        } else {
          await payload.create({
            collection: 'opinie',
            data: opiniaData,
          })
        }
        console.log(`   ✅ ${data.author}`)
      } catch (e) {
        console.error(`   ❌ Error migrating ${file}:`, e)
      }
    }
  }

  // 13. FAQ
  console.log('\n❓ Migrating FAQ collection...')
  const faqDir = path.join(CONTENT_DIR, 'faq')
  const faqFiles = readDir(faqDir)
  for (const file of faqFiles) {
    const data = readJson(path.join(faqDir, file))
    if (data) {
      const slug = file.replace('.json', '')
      try {
        const existing = await payload.find({
          collection: 'faq',
          where: { slug: { equals: slug } },
        })

        // Read answer from mdoc file if exists
        let answer = data.answer || ''
        const mdocPath = path.join(faqDir, slug, 'answer.mdoc')
        if (fs.existsSync(mdocPath)) {
          answer = fs.readFileSync(mdocPath, 'utf-8')
        }

        const faqData = {
          slug,
          question: data.question,
          answer: answer,
          order: data.order || 1,
        }

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'faq',
            id: existing.docs[0].id,
            data: faqData,
          })
        } else {
          await payload.create({
            collection: 'faq',
            data: faqData,
          })
        }
        console.log(`   ✅ ${data.question?.substring(0, 40)}...`)
      } catch (e) {
        console.error(`   ❌ Error migrating ${file}:`, e)
      }
    }
  }

  console.log('\n🎉 Migration completed successfully!')
  console.log('   All content from Keystatic has been migrated to Payload CMS.')
  
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
