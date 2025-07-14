let storiesData = JSON.parse(localStorage.getItem('stories')) || [];

const saveStories = () => {
  localStorage.setItem('stories', JSON.stringify(storiesData));
};

export const updateStoryLikes = (storyId, userId, liked) => {
  const story = storiesData.find(s => s.id === storyId);
  if (story) {
    if (liked && !story.likedBy.includes(userId)) {
      story.likedBy.push(userId);
      story.likes++;
    } else if (!liked && story.likedBy.includes(userId)) {
      story.likedBy = story.likedBy.filter(id => id !== userId);
      story.likes--;
    }
    saveStories();
  }
};

export const addStoryComment = (storyId, comment) => {
  const story = storiesData.find(s => s.id === storyId);
  if (story) {
    story.comments.push(comment);
    saveStories();
  }
};

export const addStory = (newStory) => {
  storiesData.unshift(newStory); // Add to the beginning
  saveStories();
};

export const deleteStory = (storyId) => {
  storiesData = storiesData.filter(story => story.id !== storyId);
  saveStories();
};

export default storiesData;