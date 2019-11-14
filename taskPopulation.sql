

INSERT INTO "public"."forms"("id","user_id","title","button_text","fields","redirect_route","description")
VALUES
(
    E'053ce509-aedc-4d73-ba4a-0ce388ec5bc6', 
    E'b6a2beda-6a38-4ca8-a64d-02b7b961e498',
    E'Module 0: Intake. Please enter basic information about your household contact here:',
    E'Submit',
    E'[
        {
        "name": "reliable_internet",
        "type": "radio",
        "label": "Does this person have reliable access to the internet at their home, on a cell phone, or on a mobile device?",
        "selectOptions": [
            {"label":"Yes", "value":"yes"},
            {"label":"No", "value":"no"},
            {"label":"Unassessed or Refused", "value":"UORR"}
        ],
        "validationTests":"[[\\"yup.string\\"],[\\"yup.required\\"]]"
        },
        {
        "name": "english_comfort",
        "type": "radio",
        "label": "What is this person’s level of comfort with speaking, reading, and writing in English?",
        "selectOptions": [
            {"label":"1- Is comfortable speaking, reading, and writing in English", "value":"1"},
            {"label":"2- Is comfortable speaking English but has difficulty reading and writing", "value":"2"},
            {"label":"3- Is somewhat comfortable speaking, reading and writing in English, but is more comfortable speaking in another language.", "value":"3"},
            {"label":"4- Is not comfortable speaking, reading, or writing in English", "value":"4"}
        ],
        "validationTests":"[[\\"yup.string\\"],[\\"yup.required\\"]]"         
        },
        {
            "name": "english_comfort_other",
            "type": "text",
            "label": "Other Comfort Level: Please describe",
            "placeholder": "Other Comfort Level: Please describe"
        },
        {
            "name": "non_english_languages",
            "type": "checkbox",
            "label": "What non-english languages does this person speak and read or write?",
            "selectOptions": [
                {"label":"Spanish", "value":"spanish"},
                {"label":"Chinese", "value":"chinese"},
                {"label":"Vietnamese", "value":"vietnamese"},
                {"label":"Russian", "value":"russian"},
                {"label":"Tagalog", "value":"tagalog"},
                {"label":"Korean", "value":"korean"}
            ]
        },
        {
            "name": "non_english_languages_other",
            "type": "text",
            "label": "Additional languages or languages not listed above:",
            "placeholder": "Additional languages or languages not listed above:"
        }
  
    ]',
    NULL,
    E''
);

INSERT INTO "public"."task_definitions"("id","active","form_id","created_by","last_edited_by","points","is_globally_available")
VALUES
(E'10cadb7e-670f-4f85-93c1-fb2a7b842bc5',TRUE,E'053ce509-aedc-4d73-ba4a-0ce388ec5bc6',E'b6a2beda-6a38-4ca8-a64d-02b7b961e498',NULL,0,FALSE);


INSERT INTO "public"."task_assignments"(
    "id",
    "team_id", 
"task_definition_id",
"active",
"task_required_roles",
"not_until_completion_of",
"not_available_before_ts",
"not_available_after_ts",
"created_at",
"updated_at","sort_value")
VALUES(
  E'c6a2beda-6a38-4ca8-a64d-02b7b961e498',
  E'493fa89a-9a07-42a3-a0ae-5a48702090bd',
  E'10cadb7e-670f-4f85-93c1-fb2a7b842bc5',
  True,
  8,
  NULL,
  NULL,
  NULL,
  NOW(),
  NOW(),
  0
);