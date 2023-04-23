exports.handler = async (event) => {
    const { mappings } = JSON.parse(event.body);
    try {
      await fetch('https://my-bucket.s3.amazonaws.com/mapping.json', {
        method: 'PUT',
        body: JSON.stringify(mappings),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return {
        statusCode: 200,
        body: 'Mappings stored successfully'
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: 'Failed to store mappings'
      };
    }
  };
  