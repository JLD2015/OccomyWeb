function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--Home screen-->
       <url>
         <loc>https://www.occomy.com/</loc>
       </url>

       <!--Contact screen-->
       <url>
         <loc>https://www.occomy.com/contact</loc>
       </url>

       <!--Privacy Policy-->
       <url>
         <loc>https://www.occomy.com/privacypolicy</loc>
       </url>

       <!--Terms and Conditions-->
       <url>
         <loc>https://www.occomy.com/termsandconditions</loc>
       </url>
     </urlset>
   `;
}

export default function SiteMap() {
  // getServerSideProps does the work here
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap
  const sitemap = generateSiteMap();

  // Send XML to browser
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
