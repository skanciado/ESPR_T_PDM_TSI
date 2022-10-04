const router = require("express").Router();
const {createError} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
router.get("/help", async (req, res) => {
  //la cookie sale descodificada porque el secreto se lo hemos pasado en el cookieParser
  const decrypt = await verifyToken(req, res);
  if (decrypt.payload !== undefined) {
    let url = process.env.APP_URL;
    let helpMsg =
      `
        <style>
            table, th, td {
                border:1px solid black;
            }
        </style>
            <h2>Incremental Api Rest Help</h2>
            <div></div>
            <table style="width:100%">
                <tr>
                    <th style="width:25%">Description</th>
                    <th style="width:15%">Http Verb</th>
                    <th style="width:25%">Url</th>
                    <th style="width:25%">Body Json Example</th>
                </tr>
                <tr>
                    <td>Get List of all projects</td>
                    <td>GET</td>
                    <td>` +
      url +
      `/projects</td>
                    <td> </td>
                </tr>
                <tr>
                    <td>Get List of all projects elements from a project</td>
                    <td>POST</td>
                    <td>` +
      url +
      `/projectElements</td>
                    <td>
                        {
                            "projectId": "Projects/7084124"
                        }
                    </td>
                </tr>
                <tr>
                    <td>Get List of all projects elements from a project of an specific type</td>
                    <td>POST</td>
                    <td>` +
      url +
      `/projectElements</td>
                    <td>
                        {
                            "projectId": "Projects/7084124",
                            "type": "connector"
                        }
                    </td>
                </tr>
            </table> 
        `;
    return res.send(helpMsg);
  } else {
    return res.status(process.env.CODE_API).json(createError(decrypt));
  }
});
module.exports = router;
/*
    List error codes: https://httpstatuses.com/
    **** 2×× Success ****
    200 OK
    201 Created
    202 Accepted
    204 No Content
    **** 4×× Client Error ****
    400 Bad Request
    401 Unauthorized
    402 Payment Required
    403 Forbidden
    404 Not Found
    **** 5×× Server Error
    500 Internal Server Error
    501 Not Implemented
    502 Bad Gateway
    503 Service Unavailable   
*/
