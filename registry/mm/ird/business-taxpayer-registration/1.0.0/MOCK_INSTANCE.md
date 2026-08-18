# Mock Instance — mm/ird/business-taxpayer-registration@1.0.0

## Status

This document provides two complete mock instances — a full, realistic
Myanmar Company (Private) registration and a minimal example covering
only the fields modeled `required: true` for a sole proprietor — drafted
and **ajv-validated** during GOV-8326 against a JSON Schema derived from
this document's own `fields[]` (`enum` → `{type: "string", enum: [...]}`,
`date` → `{type: "string", format: "date"}` via `ajv-formats`,
`requiredWhen` conditions honored manually), using the same `Ajv2020`
class `tools/validate-ajv.mjs` itself uses. Both instances validated
successfully (`valid: true`, zero errors). All names, numbers, and
addresses below are invented; no real person's or company's data is used.

## Full Instance (Myanmar Company (Private), Two Branches, Agent Same as Advisor)

```json
{
  "legallyRegisteredName": "Golden Irrawaddy Trading Co., Ltd.",
  "typeOfMainBusiness": "Wholesale of rice and other agricultural produce",
  "typeOfAssessee": "myanmar_company_private",
  "industryCode": "4630",
  "registrationNumber": "1023456789",
  "registrationDate": "2025-11-03",
  "dateOfCommencementOfOperation": "2026-01-15",
  "businessContactHouseNo": "27",
  "businessContactStreet": "Bogyoke Aung San Street",
  "businessContactQuarter": "Kyauktada",
  "businessContactTownship": "Kyauktada Township",
  "businessContactStateRegion": "Yangon Region",
  "officeContactPhoneNumber": "+95-1-255-1234",
  "faxNumber": "+95-1-255-1235",
  "contactEmailAddress": "info@goldenirrawaddytrading.example.com",
  "websiteAddress": "https://goldenirrawaddytrading.example.com",
  "branch1Name": "Mandalay Branch",
  "branch1HouseNo": "58",
  "branch1Street": "84th Street",
  "branch1Quarter": "Chan Aye Tharzan",
  "branch1Township": "Chan Aye Tharzan Township",
  "branch1StateRegion": "Mandalay Region",
  "branch1DateOpened": "2026-03-01",
  "branch2Name": "Mawlamyine Branch",
  "branch2HouseNo": "14",
  "branch2Street": "Strand Road",
  "branch2Quarter": "Myoma",
  "branch2Township": "Mawlamyine Township",
  "branch2StateRegion": "Mon State",
  "branch2DateOpened": "2026-05-20",
  "advisorName": "U Thura Aung",
  "advisorTin": "9988776655",
  "advisorHouseNo": "12",
  "advisorStreet": "Merchant Street",
  "advisorQuarter": "Botahtaung",
  "advisorTownship": "Botahtaung Township",
  "advisorStateRegion": "Yangon Region",
  "advisorOfficePhoneNumber": "+95-1-388-2211",
  "advisorMobilePhoneNumber": "+95-9-4500-11223",
  "advisorContactEmailAddress": "thura.aung@example.com",
  "agentSameAsAdvisor": true,
  "bankAccount1Name": "Myanma Economic Bank",
  "bankAccount1Number": "MEB-0234567891",
  "bankAccount2Name": "Kanbawza Bank",
  "bankAccount2Number": "KBZ-1122334455",
  "authorizedCapitalShares": 10000,
  "authorizedCapitalValue": 100000000,
  "paidUpCapitalShares": 6000,
  "paidUpCapitalValue": 60000000,
  "currentNumberOfEmployees": 42,
  "declarantFullName": "Daw Khin Mya Win",
  "declarantTitle": "Managing Director"
}
```

## Minimal Instance (Sole Proprietor, Required Fields Only)

```json
{
  "legallyRegisteredName": "Shwe Pinlon Grocery Store",
  "typeOfMainBusiness": "Retail sale of groceries and household goods",
  "typeOfAssessee": "sole_proprietor",
  "industryCode": "4711",
  "dateOfCommencementOfOperation": "2026-02-01",
  "businessContactHouseNo": "9",
  "businessContactStreet": "Anawrahta Road",
  "businessContactTownship": "Pabedan Township",
  "businessContactStateRegion": "Yangon Region",
  "officeContactPhoneNumber": "+95-1-221-3344",
  "ownerName": "Ko Zaw Min Htet",
  "ownerNicNumber": "12/PaBeTa(N)123456",
  "ownerHouseNo": "9",
  "ownerStreet": "Anawrahta Road",
  "ownerTownship": "Pabedan Township",
  "ownerStateRegion": "Yangon Region",
  "ownerBusinessPhoneNumber": "+95-1-221-3344",
  "currentNumberOfEmployees": 2
}
```
