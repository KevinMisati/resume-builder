import {z} from "zod"
export const optionalString = z.string().trim().optional().or(z.literal(""))
export const generalInfoSchema = z.object({
    id:optionalString,
    title:optionalString,
    description:optionalString
})
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>

export const personalInfoSchema = z.object({
    photo: optionalString.refine((val) => {
        if (!val) return true; // allow empty or undefined

        const [prefix, base64] = val.split(",");
        if (!prefix || !base64) return false;

        // ✅ 1. Check that it's an image (jpeg, png, webp, etc.)
        const isImage = /^data:image\/(jpeg|png|webp|jpg|svg\+xml);base64$/.test(prefix);
        if (!isImage) return false;

        // ✅ 2. Check decoded size
        const sizeInBytes = (base64.length * 3) / 4;
        return sizeInBytes <= 4.3 * 1024 * 1024
      }, {
        message: "Photo must be a JPEG, PNG, or WebP image and less than 4MB in size",
    }),
    firstName:optionalString,
    lastName:optionalString,
    jobTitle:optionalString,
    city:optionalString,
    country:optionalString,
    phone:optionalString,
    email:optionalString,
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional()
})

export type SkillsValues = z.infer<typeof skillsSchema>

export const summarySchema = z.object({
  summary:optionalString
})

export type SummaryValues = z.infer<typeof summarySchema>

export const resumeSchema = z.object({
    ...generalInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    colorHex:optionalString,
    borderStyle:optionalString,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>,"photo"> & {
    id?: string
    photo?: string | null
}