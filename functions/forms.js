const got = require('got');
const catchify = require('catchify');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

exports.handler = async function (event, ctx) {
  if (!event.queryStringParameters.id) {
    return Promise.resolve({
      body: JSON.stringify({ errors: ['ID of form must be supplied.'] }),
      statusCode: 400,
    });
  }

  const [err, form] = await catchify(got(
    `https://api.planningcenteronline.com/people/v2/forms/${event.queryStringParameters.id}/fields`,
    {
      username: PCO_TOKEN,
      password: PCO_SECRET,
      searchParams: {
        order: 'sequence',
        include:
          'options,field_definitions,field_options,marital_statuses,campuses,form_field_conditions,school_options',
      },
    },
  ).json());

  if (err) {
    return Promise.resolve({
      body: JSON.stringify({ errors: [err] }),
      statusCode: 400,
    });
  }

  return Promise.resolve({
    body: JSON.stringify(form),
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
