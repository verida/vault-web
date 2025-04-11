"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CountryCombobox,
  CountryComboboxContent,
  CountryComboboxTrigger,
  CountryComboboxValue,
} from "@/features/countries/components/country-combobox"
import { AvatarUploadInput } from "@/features/verida-profile/components/avatar-upload-input"
import { VeridaProfileFormDataSchema } from "@/features/verida-profile/schemas"
import type { VeridaProfileFormData } from "@/features/verida-profile/types"

export const onboardingStepId = "profile"
export const onboardingStepBreadcrumbTitle = "Profile"

export interface OnboardingStepProfileContentProps {
  onPreviousStepClick: () => void
  previousStepButtonLabel?: string
  onNextStepClick: () => void
  nextStepButtonLabel?: string
  onProfileFormSubmit: (data: VeridaProfileFormData) => void
  initialData?: VeridaProfileFormData
}

export function OnboardingStepProfileContent(
  props: OnboardingStepProfileContentProps
) {
  const {
    onPreviousStepClick,
    previousStepButtonLabel = "Back",
    onNextStepClick,
    nextStepButtonLabel = "Next",
    onProfileFormSubmit,
    initialData,
  } = props

  const handleSubmit = useCallback(
    async (data: VeridaProfileFormData) => {
      onProfileFormSubmit(data)
      onNextStepClick()
    },
    [onProfileFormSubmit, onNextStepClick]
  )

  const form = useForm<VeridaProfileFormData>({
    resolver: zodResolver(VeridaProfileFormDataSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      country: "",
      avatar: { uri: "" },
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        description: initialData.description || "",
        website: initialData.website || "",
        country: initialData.country || "",
        avatar: { uri: initialData.avatar?.uri || "" },
      })
    }
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Fill in your profile</CardTitle>
            <CardDescription>
              Fill in some details about yourself.
            </CardDescription>
            <CardDescription>
              Your profile is <strong className="font-bold">public</strong> as
              part of your identity on the Verida Network. You can modify it at
              any time later.
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 px-0.5">
            <FormField
              control={form.control}
              name="avatar.uri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <AvatarUploadInput
                      value={field.value}
                      onValueChange={field.onChange}
                      onError={(error) => {
                        if (!error) {
                          form.clearErrors("avatar.uri")
                          return
                        }
                        form.setError("avatar.uri", {
                          message: error,
                        })
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a square image (JPG, PNG, WebP, GIF) less than 1MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your name as displayed to others. (required)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I am a privacy enthusiast..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description about yourself. (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <CountryCombobox>
                    <CountryComboboxTrigger asChild>
                      <FormControl>
                        <CountryComboboxValue selectedValue={field.value} />
                      </FormControl>
                    </CountryComboboxTrigger>
                    <CountryComboboxContent
                      selectedValue={field.value}
                      onSelectValue={field.onChange}
                    />
                  </CountryCombobox>
                  <FormDescription>
                    The country where you are located. (optional)
                  </FormDescription>
                  <FormDescription className="text-primary">
                    Selecting a country helps determine where your data should
                    initially be stored
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your personal or professional website. (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardBody>
          <CardFooter className="flex flex-col gap-4">
            <Alert variant="warning">
              <AlertDescription>
                Your profile information are public. Share only what you want.
              </AlertDescription>
            </Alert>
            <div className="flex flex-row justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onPreviousStepClick}
                className="w-full sm:w-fit"
              >
                {previousStepButtonLabel}
              </Button>
              <Button type="submit" className="w-full sm:w-fit">
                {nextStepButtonLabel}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
OnboardingStepProfileContent.displayName = "OnboardingStepProfileContent"
