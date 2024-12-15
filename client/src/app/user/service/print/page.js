'use client'

import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  photos: Yup.array().min(1, 'At least one photo is required'),
  description: Yup.string().required('Description is required'),
})

export default function PrintService() {
  const [previewUrls, setPreviewUrls] = useState([])

  const initialValues = {
    name: '',
    photos: [],
    description: '',
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
    setSubmitting(false)
  }

  const handlePhotoChange = (event, setFieldValue) => {
    const files = event.currentTarget.files
    if (files) {
      setFieldValue('photos', Array.from(files))
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewUrls(urls)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Print Service</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  className={errors.name && touched.name ? 'border-red-500' : ''}
                />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <Label htmlFor="photos">Photos</Label>
                <Input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => handlePhotoChange(event, setFieldValue)}
                  className={errors.photos && touched.photos ? 'border-red-500' : ''}
                />
                {errors.photos && touched.photos && <div className="text-red-500 text-sm mt-1">{errors.photos}</div>}
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  ))}
                </div>
              )}

              <div>
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  className={errors.description && touched.description ? 'border-red-500' : ''}
                />
                {errors.description && touched.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
              </div>

              <div>
                <Label>Cash</Label>
                <div className="text-2xl font-bold">Rs.{values.photos.length * 100}</div>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Print'}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

