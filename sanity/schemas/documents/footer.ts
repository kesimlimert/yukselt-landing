import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "bottomLinks",
      title: "Bottom Links",
      type: "array",
      of: [
        {
          name: "bottomLink",
          title: "Bottom Link",
          type: "object",
          fields: [
            {
              name: "linkText",
              title: "Link Text",
              type: "string",
            },
            {
              name: "linkUrl",
              title: "Link URL",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "array",
      of: [
        {
          name: "socialMediaItem",
          title: "Social Media Item",
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "image",
            },
            {
              name: "link",
              title: "Link",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          name: "row",
          title: "Row",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  name: "link",
                  title: "Link",
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      title: "Name",
                      type: "string",
                    },
                    {
                      name: "url",
                      title: "URL",
                      type: "url",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
