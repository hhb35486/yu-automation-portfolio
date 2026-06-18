# Excel / CSV Cleaner Validation Log Template

Use this table for manual observation during the 14-day validation window.

Allowed `signal_strength` values:

- `none`
- `weak`
- `medium`
- `strong`

Allowed `next_action` values:

- `ignore`
- `clarify`
- `log_pattern`
- `update_copy_later`
- `consider_next_demo`
- `reject_sensitive_data`

| date | source | what_happened | user_type_guess | pain_described | asked_for_real_data_upload | contact_clicked_or_message | signal_strength | risk_notes | next_action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | public demo / message / chat / social post | Brief neutral note | unknown / operator / admin / founder / analyst | none / brief description | yes / no / unclear | yes / no / unclear | none / weak / medium / strong | Privacy, sensitive data, unclear scope, or no risk | ignore / clarify / log_pattern / update_copy_later / consider_next_demo / reject_sensitive_data |

## Logging Rules

- Keep notes short and factual.
- Do not paste private conversations.
- Do not store real names, phone numbers, emails, account IDs, addresses, order details, or internal documents.
- If someone mentions sensitive data, log the risk category only.
- If the request is unclear, mark `signal_strength` as `weak` or `none`.
- If the person describes a specific report-table-cleaning workflow, mark `signal_strength` as `medium` or `strong` depending on clarity.
