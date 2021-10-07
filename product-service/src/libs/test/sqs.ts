import { SQSEvent } from "aws-lambda";

export function createEvent(data: any): SQSEvent {
  const ev: SQSEvent = { Records: [] };
  if (!Array.isArray(data)) {
    data = [data];
  }
  data.forEach((d) => {
    const record = {
      messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      receiptHandle: "MessageReceiptHandle",
      body: d?.body,
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: "1523232000000",
        SenderId: "123456789012",
        ApproximateFirstReceiveTimestamp: "1523232000001",
      },
      messageAttributes: {},
      md5OfBody: "{{{md5_of_body}}}",
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      awsRegion: "us-east-1",
    };
    ev.Records.push(record);
  });
  return ev;
}
