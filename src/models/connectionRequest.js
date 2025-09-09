const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //reference to the user
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['ignored', 'interested', 'accepted', 'rejected'],
        message: (props) => `${props} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequest.find({
//   fromUserId: 273478465864786587,
//   toUserId: 2734784654356543,
// });

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre('save', function (next) {
  const connectionRequest = this;
  // check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('Cannot send connection Request to yourself');
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema
);

module.exports = { ConnectionRequestModel };
