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

const homepage = await client.fetch('*[_type == "homepage" && _id == "homepage-main"][0]{tour}');

const tourImage = await uploadImage(
  "/Users/razan/Downloads/_DEL5829.jpg",
  "sais-book-a-tour-card.jpg",
  "SAIS student playing in a red tunnel"
);

const applicationImage = await uploadImage(
  "/Users/razan/Downloads/_DEL6328.jpg",
  "sais-application-card.jpg",
  "SAIS high school students in class"
);

await client
  .patch("homepage-main")
  .set({
    tour: {
      _type: "object",
      ...(homepage?.tour || {}),
      cards: [
        {
          _type: "featureCard",
          _key: "book-a-tour",
          title: "Book a Tour",
          theme: "blue",
          image: tourImage,
          cta: {
            _type: "cta",
            label: "Book Now",
            href: "#tour",
            variant: "primary",
            openInNewTab: false,
          },
        },
        {
          _type: "featureCard",
          _key: "start-application",
          title: "Start Your Application",
          theme: "teal",
          image: applicationImage,
          cta: {
            _type: "cta",
            label: "Start Now",
            href: "#apply",
            variant: "primary",
            openInNewTab: false,
          },
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.tour cards and uploaded the two tour images.");
