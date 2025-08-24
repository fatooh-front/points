// generate-pages.ts
import fs from "fs";
import path from "path";

const baseDir = path.resolve("srcmainlayoutpagesReports"); // غيّر لو المجلد عندك اسمه غير app

const paths = [
  "/annual-income-comparison",
  "/revenue-growth",
  "/automobile-assets",
  "/cars-for-sale",
  "/car-sales",
  "/claims",
  "/branch-collections",
  "/rents-by-branch",
  "/branch-rent-comparison",
  "/new-customers-at-branches",
  "/occupancy-rate",
  "/rents-by-vehicle-type",
  "/employee-contracts",
  "/employee-sales",
  "/employee-sales-by-branch",
  "/leased-vehicles-by-type",
  "/long-term-contracts",
  "/new-contracts",
  "/personal-vs-business-comparison",
  "/leasing-method",
];

for (const route of paths) {
  const fullPath = path.join(baseDir, route);
  const pagePath = path.join(fullPath, "page.tsx");
  console.log(pagePath);

  // Create folder if not exists
  fs.mkdirSync(fullPath, { recursive: true });

  // Add page.tsx if not exists
  if (!fs.existsSync(pagePath)) {
    fs.writeFileSync(
      pagePath,
      `export default function Page() {
  return <div>${route.replace("/", "")} Page</div>;
}
`
    );
    console.log(`✅ Created: ${pagePath}`);
  } else {
    console.log(`⚠️ Already exists: ${pagePath}`);
  }
}
