import { getAllFaq } from '@/lib/keystatic';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const faq = await getAllFaq();
    // Mapuj dane do prostszej struktury dla frontendu
    const mappedFaq = faq.map((item: any) => ({
      slug: item.slug,
      question: typeof item.question === 'object' ? item.question?.name : item.question,
      answer: item.answer,
      order: item.order,
    }));
    return NextResponse.json(mappedFaq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json([], { status: 500 });
  }
}
