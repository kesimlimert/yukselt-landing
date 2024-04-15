import { defineField, defineType } from "sanity";

export default defineType({
  name: 'thirdContent',
  title: 'Third Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Experience Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Experience Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});