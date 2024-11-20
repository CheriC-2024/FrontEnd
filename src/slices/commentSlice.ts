import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reply {
  id: string;
  text: string;
}

interface Comment {
  id: string;
  text: string;
  replies: Reply[];
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [
    {
      id: '1',
      text: '미술작품 보시는 센스가 돋보이는 전시였습니다. 잘봤습니다.',
      replies: [],
    },
  ],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<string>) => {
      const newComment: Comment = {
        id: new Date().toISOString(),
        text: action.payload,
        replies: [],
      };
      state.comments.push(newComment);
    },
    addReply: (
      state,
      action: PayloadAction<{ commentId: string; replyText: string }>,
    ) => {
      const { commentId, replyText } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        const newReply: Reply = {
          id: new Date().toISOString(),
          text: replyText,
        };
        comment.replies.push(newReply);
      }
    },
  },
});

export const { addComment, addReply } = commentsSlice.actions;
export default commentsSlice.reducer;
