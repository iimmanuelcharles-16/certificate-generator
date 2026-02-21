import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Certificate({ name, course, date }) {
  const certificateRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="certificate-wrapper">
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-border">

          <h1 className="title">Certificate of Completion</h1>

          <p className="subtitle">This is proudly presented to</p>

          <h2 className="student-name">
            {name || "Student Name"}
          </h2>

          <p className="text">
            for successfully completing the course
          </p>

          <h3 className="course-name">
            {course || "Course Name"}
          </h3>

          <div className="bottom-section">
            <div>
              <p>Date</p>
              <strong>{date || "__ / __ / ____"}</strong>
            </div>

            <div>
              <p>Authorized Signature</p>
              <div className="signature-line"></div>
            </div>
          </div>

        </div>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default Certificate;

