import Blog from "./blog";
import User from "./user";
import ReadingList from "./readingList";
import ReadingListItem from "./readingListItem";
import Session from "./session";

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasOne(ReadingList);
ReadingList.belongsTo(User);

ReadingList.hasMany(ReadingListItem);
ReadingListItem.belongsTo(ReadingList);

Blog.hasMany(ReadingListItem);
ReadingListItem.belongsTo(Blog);

ReadingList.belongsToMany(Blog, { through: ReadingListItem });
Blog.belongsToMany(ReadingList, { through: ReadingListItem });

User.hasMany(Session);
Session.belongsTo(User);

export { Blog, User, ReadingList, ReadingListItem, Session };
