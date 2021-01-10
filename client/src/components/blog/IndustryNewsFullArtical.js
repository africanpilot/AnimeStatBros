/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody
} from "shards-react";

const IndustryNewsFullArtical = ({ title, discussions }) => (
  <Row>
    {discussions.map((post, idx) => (
      <Col lg="12" sm="12" className="mb-4" key={idx}>
        <Card>
          <CardBody>
            <header className="td-post-title">
            <h1 className="entry-title">7 Wonder About The Anime Industry</h1>
            </header>
            <span className="text-muted"> By {post.author} - {post.date}</span><div/>
            <br/>
            <div className="td-post-featured-image">
              <a href="https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462.jpg" data-caption="" className="td-modal-image">
                <img width="100%" height="522" className="entry-thumb td-animation-stack-type0-2" src="https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462-696x443.jpg" srcSet="https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462-696x443.jpg 696w, https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462-300x191.jpg 300w, https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462-768x489.jpg 768w, https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462-660x420.jpg 660w, https://www.somagnews.com/wp-content/uploads/2020/10/Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601586909462.jpg 960w" sizes="(max-width: 696px) 100vw, 696px" alt="" title="Astro-Boy-Anime-Imagem-Destaque-Curiosidades-Industria-Anime-e1601573560567"/>
              </a>
            </div>
            <p><strong>Whether you are a big fan of anime, or just curious from other places, such as the universe of e-sports, there is always something more to learn, even for pure otaku.</strong></p>
            <p>The Japanese animation industry is rich in experiences, innovations, inspirations and even records. It is this type of incredible information that this article focuses on. Do you know any?</p>
            <h2>Anime aesthetics exist thanks to Disney</h2>
            <p>Currently there are multiple styles of anime, with a good part still preserving the original features created by Osamu Tezuka in Astro Boy, one of the parents of Japanese animation. Tezuka-sensei had an undeniable impact on the anime industry, but, before reaching that point, Tezuka was influenced by the Disney titles that were part of his time, such as the iconic Mickey Mouse. Even if you weren’t aware of this curiosity, you certainly already knew the famous character Astro Boy, in which you can see many Disney traces.</p>
            <h2>Space Brothers is known for the first dubbing performed in Space</h2>
            <div className="code-block code-block-4" style={{margin: '8px auto', textAlign: 'center', display: 'block', clear: 'both'}}>
            <script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            </div>
            <p>Space Brothers (Uchuu Kyoudai) is an anime adaptation of the manga of the same name, which tells the story of two boys who dream of one day being astronauts. Despite its percentage of science fiction, Space Brothers is a title that tries to maintain as much reality as possible in the narrative. So, if you’re an enthusiast about everything related to Space, this anime is a must. One of the most interesting aspects is the fact that Episode 31 presents an unprecedented scene with the astronaut Akihiko Hoshide, who was at the International Space Station, where the first dubbing in Space was recorded. This is undoubtedly a milestone in the anime industry.</p>
            <p><iframe title="Space Brothers Anime Trailer (English Subbed)" width="100%" height="392" src="https://www.youtube.com/embed/ciS3fDqT1Vw?feature=oembed" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="" style={{height: "391.5px"}}></iframe></p>
            <h2>The greatest anime ever has over 2500 episodes streamed</h2>
            <p>An anime usually has 12 to 24 episodes, sometimes shorter, sometimes longer. Then there are those capable of breaking records worthy of being recorded in Guinness, such as Sazae-san, which premiered in 1969 and totals over 2500 episodes. Sazae-san is the longest anime ever and is still broadcast in Japan.</p>
            <h2>The anime character who has 22 Voices</h2>
            <p>In Is This a Zombie ?, there is a character who never speaks, the powerful Eucliwood Hellscythe. The perverted protagonist, Ayumu, often fantasizes how she would speak, and in all the episodes in which this happens, a new actress appears to give her a voice and a different interpretation.</p>
            <p><iframe title="Ayumu's Break Dance" width="100%" height="522" src="https://www.youtube.com/embed/2CU3qx-iuA8?feature=oembed" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="" style={{height: "391.5px"}}></iframe></p>
            <h2>Japanese animation has more than a century</h2>
            <p>In the early 1950s, Tezuka-sensei took the first steps towards creating Japanese animation as we know it today. But, that’s not where it all started. There are files that indicate that the first animated film appeared in 1907, entitled Katsudō Shashin.</p>
            <h2>Ghibli Studios are named after an Airplane</h2>
            <p>Hayao Miyazaki has a great love for aviation, demonstrated several times through his filmography. The Caproni Ca.309 Ghibli, an Italian plane used in World War II, was the model that specifically inspired Miyazaki-sensei, naming his celebrated animation studio by Ghibli.</p>
            <h2>The bad conditions of the Anime Industry</h2>
            <p>It is hard to believe, but the income of a Japanese animator is often below the minimum wage. On the other hand, animators in the West, more precisely in the United States, have better conditions. As a result, it often happens that anime creators seek out other countries in order to live better as animators. It is a meticulous work, which requires a lot of attention and a lot of time, and therefore requires more recognition, better conditions and an adequate payment. It is true that more people are beginning to fight for a change in the industry, but we will have to wait and see what the future holds.</p>
            <p>Hopefully this universe will never stop growing and improving!</p>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
);

IndustryNewsFullArtical.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  post: PropTypes.array
};


// Second list of posts.
IndustryNewsFullArtical.defaultProps = {
  title: "Discussions",
  discussions: [
    {
      backgroundImage: require("../../images/content-management/news.jpg"),
      category: "Industry News",
      categoryTheme: "dark",
      author: "Daniel Kucher",
      authorAvatar: require("../../images/avatars/1.jpg"),
      title:
        "7 Wonder About The Anime Industry",
      body:"",
      date: "29 February 2019",
      readmorelink:"#",
    }
  ]
}

export default IndustryNewsFullArtical;