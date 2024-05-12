export type NewsType = {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    author: string;
  }

export type NYTimesResponseType = {
  _id: string;
  headline: { main: string };
  lead_paragraph: string;
  byline: { original: string };
  pub_date: string;
  section_name: string;
  source: string;
  news_desk: string;
  multimedia: Array<{ url: string }>;
  web_url: string;
};

export type GuardianNewsType = {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}
