const { MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const EMAIL_REGEX = /.+@.+\..+/;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  MONGODB_URL,

  EMAIL_REGEX,
  URL_REGEX,
};
