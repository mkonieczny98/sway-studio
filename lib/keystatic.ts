import fs from 'node:fs';
import path from 'node:path';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

// Resolve project root even if the dev server is started from the parent directory.
function resolveProjectRoot() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'content'))) return cwd;
  const nested = path.join(cwd, 'sway-nextjs');
  if (fs.existsSync(path.join(nested, 'content'))) return nested;
  return cwd;
}

const projectRoot = resolveProjectRoot();

// Tworzymy reader do pobierania danych z plików JSON
export const reader = createReader(projectRoot, keystaticConfig);

// Typy dla danych
export type HomepageData = Awaited<ReturnType<typeof reader.singletons.homepage.read>>;
export type SettingsData = Awaited<ReturnType<typeof reader.singletons.settings.read>>;
export type NavigationData = Awaited<ReturnType<typeof reader.singletons.navigation.read>>;
export type FooterData = Awaited<ReturnType<typeof reader.singletons.footer.read>>;

// Funkcje pomocnicze do pobierania danych
export async function getHomepageData() {
  return await reader.singletons.homepage.read();
}

export async function getSettings() {
  return await reader.singletons.settings.read();
}

export async function getNavigation() {
  return await reader.singletons.navigation.read();
}

export async function getFooter() {
  return await reader.singletons.footer.read();
}

export async function getZajeciaPage() {
  return await reader.singletons.zajeciaPage.read();
}

export async function getFaqPage() {
  return await reader.singletons.faqPage.read();
}

export async function getCennikPage() {
  const data = await reader.singletons.cennikPage.read();
  // Pobierz treść dokumentu notes
  const notesContent = data?.notes ? await (data.notes as any)() : [];
  return {
    ...data,
    notes: notesContent
  };
}

export async function getKontaktPage() {
  return await reader.singletons.kontaktPage.read();
}

export async function getRegulaminPage() {
  const data = await reader.singletons.regulaminPage.read();
  // Pobierz treść dokumentu content
  const contentData = data?.content ? await (data.content as any)() : [];
  return {
    ...data,
    content: contentData
  };
}

// Kolekcje
export async function getAllKarnety() {
  const slugs = await reader.collections.karnety.list();
  const karnety = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.karnety.read(slug);
      return { slug, ...data };
    })
  );
  return karnety.sort((a, b) => (a?.order || 0) - (b?.order || 0));
}

export async function getAllZajecia() {
  const slugs = await reader.collections.zajecia.list();
  const zajecia = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.zajecia.read(slug);
      return { slug, ...data };
    })
  );
  return zajecia.sort((a, b) => (a?.order || 0) - (b?.order || 0));
}

export async function getZajeciaForHomepage() {
  const zajecia = await getAllZajecia();
  return zajecia.filter((z) => z?.showOnHome);
}

export async function getAllOpinie() {
  const slugs = await reader.collections.opinie.list();
  const opinie = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.opinie.read(slug);
      return { slug, ...data };
    })
  );
  return opinie.sort((a, b) => (a?.order || 0) - (b?.order || 0));
}

export async function getAllFaq() {
  const slugs = await reader.collections.faq.list();
  const faq = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.faq.read(slug);
      // Pobierz treść dokumentu answer
      const answerContent = data?.answer ? await (data.answer as any)() : [];
      return { 
        slug, 
        question: data?.question,
        order: data?.order,
        answer: answerContent 
      };
    })
  );
  return faq.sort((a, b) => (a?.order || 0) - (b?.order || 0));
}
