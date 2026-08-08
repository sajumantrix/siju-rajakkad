import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollInit from "@/components/ScrollInit";

export const metadata = {
  title: {
    default: "Siju Rajakkad - Malayalam Author & Storyteller",
    template: "%s | Siju Rajakkad",
  },
  description:
    "Official website of Siju Rajakkad, award-winning Malayalam author and storyteller from Rajakkad, Idukki. Explore books, awards, and literary works.",
  keywords:
    "Siju Rajakkad, Malayalam author, Kerala writer, short stories, Idukki, Rajakkad, Malayalam literature",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Siju Rajakkad - Malayalam Author & Storyteller",
    description:
      "Explore the literary world of Siju Rajakkad. Award-winning Malayalam author from the hills of Idukki.",
    type: "website",
    url: "/",
    siteName: "Siju Rajakkad",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Siju Rajakkad - Malayalam Author & Storyteller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siju Rajakkad - Malayalam Author & Storyteller",
    description: "Explore the literary world of Siju Rajakkad. Award-winning Malayalam author from the hills of Idukki.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://sijurajakkad.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ScrollToTop />
        <ScrollInit />
        {children}
      </body>
    </html>
  );
}
