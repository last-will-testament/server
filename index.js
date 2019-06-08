require 'googleauth'
require 'google/apis/gmail_v1'

scope = 'https://mail.google.com/'
authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
  json_key_io: File.open('./config/google-service-account.json'),
  scope: scope
)

Gmail = ::Google::Apis::GmailV1
service = Gmail::GmailService.new
service.authorization = authorizer
service.watch_user(
  'user-email@gmail.com',
  {
    topic_name: 'projects/project-name/topics/topic-name',
    label_ids: ['INBOX','SENT'],
    label_filter_action: 'include'
  },
  {}
)