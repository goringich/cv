// src/components/ExportPDFButton.tsx
import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function ExportPDFButton() {
  const handleExport = async () => {
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // секции по порядку
    const sections = ["home", "projects", "skills", "experience", "contact"]

    for (let i = 0; i < sections.length; i++) {
      const id = sections[i]
      const element = document.getElementById(id)
      if (!element) continue

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL("image/png", 1.0)
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      // вставляем первую часть
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
      heightLeft -= pageHeight

      // если не влезло - дорисовываем остатки на новых страницах
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
        heightLeft -= pageHeight
      }

      // между секциями делаем новую страницу
      if (i < sections.length - 1) pdf.addPage()
    }

    pdf.save("screen.pdf")
  }

  return (
    <Button onClick={handleExport} size="sm" className="ml-2">
      <FileDown className="h-4 w-4 mr-1" /> Export Full
    </Button>
  )
}
