const { Suprsend } = require("@suprsend/node-sdk");

exports.sendNotification = () => {
  const supr_client = new Suprsend(
    process.env.SUPR_WORKSPACE_KEY,
    process.env.SUPR_WORKSPACE_SECRET
  );

  const workflowBody = {
    name: "",
    template: "",
    notification_category: "transactional",
    user: [
      {
        distinct_id: "",
      },
    ],
    data: {},
  };
};
