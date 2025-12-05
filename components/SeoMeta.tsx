import { AppConfig } from "@/lib/constants/app";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

export default function SeoMeta({ title, description }: Props) {
  console.log("seo meta");

  return (
    <Head>
      <title>
        {AppConfig.appName} -
        {title ? title + " - " + description : AppConfig.appSlogan}
      </title>

      <meta name="description" content={description} />
      <link rel="icon" href="/images/logo-telaten.png" type="image/png" />
    </Head>
  );
}
