"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
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
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { Textarea } from "@/components/ui/textarea"
import {
  CountryCombobox,
  CountryComboboxContent,
  CountryComboboxTrigger,
  CountryComboboxValue,
} from "@/features/countries/components/country-combobox"
import { getProfilePageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { AvatarUploadInput } from "@/features/verida-profile/components/avatar-upload-input"
import { useUpdateVeridaProfile } from "@/features/verida-profile/hooks/use-update-verida-profile"
import { useUserProfile } from "@/features/verida-profile/hooks/use-user-profile"
import { VeridaProfileFormDataSchema } from "@/features/verida-profile/schemas"
import type { VeridaProfileFormData } from "@/features/verida-profile/types"

const logger = Logger.create("verida-profile")

export default function ProfileEditPage() {
  const { profile, isLoading, isError } = useUserProfile()
  const { updateProfileAsync, isPending } = useUpdateVeridaProfile()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = useCallback(
    async (data: VeridaProfileFormData) => {
      setIsSubmitting(true)
      try {
        await updateProfileAsync({
          profileToSave: data,
        })
        router.replace(getProfilePageRoute())
      } catch (error) {
        logger.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [updateProfileAsync, router]
  )

  const handleCancel = useCallback(() => {
    router.back()
  }, [router])

  useEffect(() => {
    // Update form values when profile data is loaded
    if (profile) {
      form.reset({
        name: profile.name || "",
        description: profile.description || "",
        website: profile.website || "",
        country: profile.country || "",
        avatar: { uri: profile.avatar?.uri || "" },
      })
    }
  }, [profile, form])

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Loading profile...</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we are getting your profile details
          </LoadingBlockDescription>
        </LoadingBlock>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockTitle>Error loading profile</ErrorBlockTitle>
          <ErrorBlockDescription>
            There was an error loading your profile details. Please try again
            later.
          </ErrorBlockDescription>
        </ErrorBlock>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-start">
      <div className="w-full max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card>
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
                        Upload a square image (JPG, PNG, WebP, GIF) less than
                        1MB
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
                    Your profile information are public as part of your Identity
                    on the Verida Network. Share only what you want.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-row justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
ProfileEditPage.displayName = "ProfileEditPage"
