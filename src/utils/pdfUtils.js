import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Exports an HTML element to PDF using html2canvas and jsPDF.
 * This provides a "one-click" direct download experience.
 */
export const exportToPdf = async (element, filename = 'resume.pdf') => {
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(filename)
    return true
  } catch (error) {
    console.error('PDF Export Error:', error)
    return false
  }
}
