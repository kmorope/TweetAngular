export interface Tweet {
  id: number;
  user: {
    name: string;
    username: string;
    image: string;
  };
  text: string;
  date: string;
  url: string;
}
