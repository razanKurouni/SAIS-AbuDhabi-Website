import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

async function uploadImage(path, filename, title) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const newsImage = await uploadImage(
  "/Users/razan/Downloads/_DEL3453.jpg",
  "latest-news-students-reading.jpg",
  "SAIS students reading in the library"
);

const placeholderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.";

await client
  .patch("homepage-main")
  .set({
    news: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Latest News",
      },
      cta: {
        _type: "cta",
        label: "See All",
        href: "#news",
        variant: "primary",
        openInNewTab: false,
      },
      posts: [
        {
          _type: "featureCard",
          _key: "news-1",
          title: "News Healine Here",
          description: placeholderText,
          image: newsImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#news-1",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "blue",
        },
        {
          _type: "featureCard",
          _key: "news-2",
          title: "News Healine Here",
          description: placeholderText,
          image: newsImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#news-2",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "blue",
        },
        {
          _type: "featureCard",
          _key: "news-3",
          title: "News Healine Here",
          description: placeholderText,
          image: newsImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#news-3",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "blue",
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.news and uploaded the default latest news image.");
