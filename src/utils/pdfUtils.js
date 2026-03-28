import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Exports an HTML element to PDF using html2canvas and jsPDF.
 * Optimized for standard CV templates (A4 size).
 */
export const exportToPdf = async (element, filename = 'resume.pdf') => {
  if (!element) {
    console.error('PDF Export: Element not found')
    return false
  }

  try {
    // 1. Capture element with html2canvas
    const canvas = await html2canvas(element, {
      scale: 3, // Higher resolution (3x) for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Ensure we capture the full content, not just what's visible
      onclone: (clonedDoc) => {
        const clonedRef = clonedDoc.querySelector('.print-area')
        if (clonedRef) {
          clonedRef.style.transform = 'none'
          clonedRef.style.boxShadow = 'none'
          clonedRef.style.margin = '0'
        }
      }
    })

    // 2. Conver canvas to Image Data (JPEG is often more reliable for jsPDF)
    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    
    // Check if drawing actually happened
    if (imgData === 'data:,') {
       throw new Error('Canvas rendering failed (empty image data)')
    }

    // 3. Initialize PDF (A4 size)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate aspect ratio to fit the page width
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * pageWidth) / canvas.width

    // 4. Add image to PDF
    // Using 'JPEG' as format and ensuring its uppercase
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST')
    
    // 5. Save the file
    pdf.save(filename)
    return true
  } catch (error) {
    console.error('PDF Export Error:', error)
    return false
  }
}
