import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AdmissionsFeeStructureSection as AdmissionsFeeStructureSectionData } from "@/types/sanity";

type AdmissionsFeeStructureSectionProps = {
  section?: AdmissionsFeeStructureSectionData;
};

export function AdmissionsFeeStructureSection({ section }: AdmissionsFeeStructureSectionProps) {
  const rows = section?.rows || [];

  if (!rows.length) return null;

  const labels = {
    gradeYear: section?.labels?.gradeYear || "Grade/Year",
    tuitionFee: section?.labels?.tuitionFee || "Tuition Fee",
    bus: section?.labels?.bus || "Bus (AED)",
    books: section?.labels?.books || "Books (AED)",
    uniform: section?.labels?.uniform || "Uniform (AED)",
    total: section?.labels?.total || "Total (AED)",
  };
  /* The bus and total columns only show when at least one row carries a value. */
  const hasBus = rows.some((row) => row.bus);
  const hasTotal = rows.some((row) => row.total);

  return (
    <section className="admissions-fee-structure" aria-labelledby="admissions-fee-structure-title">
      <SectionReveal className="admissions-fee-structure__inner">
        <header className="admissions-fee-structure__header">
          <h2 id="admissions-fee-structure-title" className="admissions-fee-structure__title">
            {section?.heading?.title || "Our Fee Structure"}
          </h2>
          <RichText
            blocks={section?.heading?.description}
            className="admissions-fee-structure__description"
          />
        </header>

        <div className="admissions-fee-structure__table-wrap">
          <table className={`admissions-fee-structure__table ${hasTotal ? "has-total" : ""}`.trim()}>
            <thead>
              <tr>
                <th scope="col">{labels.gradeYear}</th>
                <th scope="col">{labels.tuitionFee}</th>
                {hasBus ? <th scope="col">{labels.bus}</th> : null}
                <th scope="col">{labels.books}</th>
                <th scope="col">{labels.uniform}</th>
                {hasTotal ? <th scope="col">{labels.total}</th> : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row._key || `${row.gradeYear}-${index}`}
                  style={{ "--fee-row-delay": `${140 + index * 65}ms` } as CSSProperties}
                >
                  <th scope="row">{row.gradeYear}</th>
                  <td className="admissions-fee-structure__tuition">{row.tuitionFee}</td>
                  {hasBus ? <td>{row.bus}</td> : null}
                  <td>{row.books}</td>
                  <td>{row.uniform}</td>
                  {hasTotal ? <td>{row.total}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionReveal>
    </section>
  );
}
