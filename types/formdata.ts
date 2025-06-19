import type { BasicDetails, DocumentUrls, StatementOfPurpose, InterviewAvailability } from "./form"

export interface FormDataType {
  basicDetails: BasicDetails
  documents: DocumentUrls
  statementOfPurpose: StatementOfPurpose
  interviewAvailability: InterviewAvailability
}
