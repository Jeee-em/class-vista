"use client"

import { useState } from "react"
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImportPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadState, setUploadState] = useState<"idle" | "success" | "error">("idle")

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadState("idle")
    setTimeout(() => {
      setIsUploading(false)
      setUploadState("success")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Import Data</h1>
        <p className="text-muted-foreground">Bulk upload student records and quiz results using Excel templates.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>Drag and drop your .xlsx or .csv file here</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                isUploading
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
              }`}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {isUploading ? <Loader2 className="size-6 animate-spin" /> : <Upload className="size-6" />}
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-medium">{isUploading ? "Uploading..." : "Select a file to upload"}</p>
                  <p className="text-sm text-muted-foreground">Supported formats: .xlsx, .csv (Max 10MB)</p>
                </div>
                <Button onClick={simulateUpload} disabled={isUploading} className="mt-4">
                  Browse Files
                </Button>
              </div>
            </div>

            {uploadState === "success" && (
              <Alert className="mt-6 border-green-500/20 bg-green-500/10 text-green-500">
                <CheckCircle2 className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  File "student_records_q4.xlsx" has been uploaded successfully. 124 records were processed.
                </AlertDescription>
              </Alert>
            )}

            {uploadState === "error" && (
              <Alert className="mt-6 border-destructive/20 bg-destructive/10 text-destructive">
                <XCircle className="size-4" />
                <AlertTitle>Import Failed</AlertTitle>
                <AlertDescription>
                  The uploaded file is missing the required "Student ID" column. Please check your template.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </div>
              <p className="text-sm">Download the official Excel template from the dashboard.</p>
            </div>
            <div className="flex gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </div>
              <p className="text-sm">Ensure all mandatory fields (Name, Grade, Subject) are filled correctly.</p>
            </div>
            <div className="flex gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </div>
              <p className="text-sm">Upload the file and review the preview before final submission.</p>
            </div>
            <Button variant="outline" className="w-full bg-background/50 border-none">
              <FileSpreadsheet className="mr-2 size-4" /> Download Template
            </Button>
            <div className="rounded-lg bg-blue-500/10 p-4 text-blue-500">
              <div className="flex items-center gap-2 mb-1">
                <Info className="size-4" />
                <span className="text-sm font-semibold">Pro Tip</span>
              </div>
              <p className="text-xs">
                Batch imports are processed in the background. You will receive a notification once the process is
                complete.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
