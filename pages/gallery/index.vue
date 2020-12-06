<template>
  <div>
    <Header />
    <div class="centered">
      <h3 class="title">Photo Gallery</h3>
    </div>
    <b-container class="start">
      <b-row>
        <NuxtLink :to="galleries[0].to" tag="no" class="card-link">
          <b-card tag="article" title="Gita a Vecchiano">
            <img :width="size" :height="size" :src="img_url" />

            <b-card-text> Terza tappa stagionale 2020 </b-card-text>
          </b-card>
        </NuxtLink>
        <NuxtLink :to="galleries[1].to" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>

        <NuxtLink :to="galleries[2].to" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>

        <NuxtLink to="/gallery/trip" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>
        <NuxtLink to="/gallery/trip" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>
        <NuxtLink to="/gallery/trip" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>
        <NuxtLink to="/gallery/trip" tag="no" class="card-link">
          <b-card :title="defaults.title" tag="article">
            <img :width="size" :height="size" :src="img_url" />
            <b-card-text>
              {{ defaults.subTitle }}
            </b-card-text>
          </b-card>
        </NuxtLink>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { routes, ropes } from "../../static/resources";

export default {
  name: "Gallery",
  data() {
    return {
      defaults: {
        title: "untitled",
        subTitle: "Add here some short description",
      },
      galleriesData: [
        {
          card_id: 1,
          title: "gita a vecchiano",
        },
        {
          card_id: 2,
          title: "secondo title",
        },
        {
          card_id: 3,
          title: "terzo title",
        },
      ],
      img_url: "https://picsum.photos/200/200/",
      size: 200,
      items: routes,
      ropes,
    };
  },
  computed: {
    galleries() {
      return this.galleriesData.map((g) => ({
        ...g,
        to: "/gallery/" + g.title,
      }));
    },
  },
};
</script>

<style>
.centered {
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin-top: 8px;
}
.start.container {
  align-items: flex-start;
}
.card {
  width: 300px;
  margin: 8px;
  border: 1px solid grey;
}
img {
  max-width: 100%;
  object-fit: contain;
}
.card:hover {
  border-color: rgb(39, 133, 216);
  cursor: pointer;
  transform: scale(1.05);
}
.card-link + .card-link {
  margin-left: 0;
}
</style>
