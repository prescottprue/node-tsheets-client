# node-tsheets-client
Client to the TSheets REST API, for time reporting etc.

## Authentication
Set the environment variable `NODE_TSHEETS_API_CLIENT_TOKEN` to a TSheets access token.

## API

### `reportTime(params, callback)`

Reports time for a user, using the provided job code.
 
**Params**

| Parameter | Description | Type | Required |
| --- | --- | --- | --- |
| api_token | TSheets API token to use for the request. | string | Yes |
| user_id | ID of TSheets user to report time for. | number | Yes |
| jobcode_id | TSheets job code ID. | number | Yes |
| duration_seconds | Total seconds to report on job code. | number | Yes |
| date | `YYYY-MM-DD` for the date to report time for. | string | Yes |
