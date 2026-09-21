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

const [aboutImage, academicsImage, communityImage, studentLifeImage] = await Promise.all([
  uploadImage("/Users/razan/Downloads/_DEL3453.jpg", "quick-links-about-us.jpg", "SAIS students reading in the library"),
  uploadImage("/Users/razan/Downloads/_DEL4827.jpg", "quick-links-academics.jpg", "SAIS student working in a science lab"),
  uploadImage("/Users/razan/Downloads/_DEL4560.jpg", "quick-links-community.jpg", "SAIS students participating in class"),
  uploadImage("/Users/razan/Downloads/_DEL4264.jpg", "quick-links-student-life.jpg", "SAIS students playing football"),
]);

await client
  .patch("homepage-main")
  .set({
    quickLinks: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Quick Links",
      },
      cards: [
        {
          _type: "featureCard",
          _key: "about-us",
          title: "About Us",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: aboutImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#about",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "blue",
        },
        {
          _type: "featureCard",
          _key: "academics",
          title: "Academics",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: academicsImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#academics",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "orange",
        },
        {
          _type: "featureCard",
          _key: "community",
          title: "Community",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: communityImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#community",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "teal",
        },
        {
          _type: "featureCard",
          _key: "student-life",
          title: "Student Life",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: studentLifeImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#student-life",
            variant: "primary",
            openInNewTab: false,
          },
          theme: "gray",
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.quickLinks and uploaded images.");
