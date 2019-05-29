<template>
  <div>
    <b-row class="shadow">
      <b-col xs="12" sm="6" class="bg-warning rounded-left">
        <ExtraWorkFeedback :user="data_[activeId]" :variant="'text-warning'"/>
      </b-col>
      <b-col xs="12" sm="6" class="rounded-right">
        <b-alert
          show
          dismissible
          class="alert-class mt-3"
        >Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
        <div class="mb-3">
          <h6 class="rating-header mb-2">Overall Rating</h6>
          <div class="border-top"></div>
          <div class="mt-2 font-weight">Based on Weekly Review</div>
        </div>
        <starRating :displayStar="5" :ratedStar="ratedStar" @starRatingSelected="submitStarRate"/>
        <div sm="6">
          <h6 class="text-inverse">Comments</h6>
        </div>
        <b-form @submit.prevent="submit">
          <b-form-textarea
            :rows="3"
            v-model="text"
            id="default-textarea"
            placeholder="Performance or general comments (if any)..."
            required
          />
          <b-button variant="primary" class="width-100 mb-xs mr-xs mt-4" type="submit">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
export default {
  name: "PerformanceBox",
  props: {
    activeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      text: "",
      ratedStar: 1,
      data_: [
        {
          _id: "5cd2b27243ea5f000a05e1e7",
          created_at: "Fri, 03 May 2019 10:41:54 GMT",
          cron_checkin: true,
          cron_recent_activity: false,
          difficulty: 3,
          extra:
            "Any extra work/ feedback/issues which you want to bring to the notice of manager",
          is_reviewed: [
            {
              _id: "5ccaf82b977b64000b775f63",
              job_title: "CEO",
              reviewed: false,
              username: "Manish Prakash",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f62",
              job_title: "Jr. Web Developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-03/613879164738_f4845bfbe967ffe718c1_192.jpg",
              reviewed: true,
              username: "Nidhi Sharma",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f66",
              job_title: "Web developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-06/626473809300_6a866cd476a701c0525b_192.jpg",
              reviewed: true,
              username: "Devkant",
              weight: 1
            }
          ],
          jobtitle: "Jr. Web Developer",
          k_highlight: {
            kpi:
              "Good expertise in tech stack and able to easy learn/adapt new things without much help",
            kra: "able to effectively handle clients"
          },
          profileImage:
            "https://avatars.slack-edge.com/2019-05-03/618964391329_c1b6a13b36ad9fe96c3c_192.jpg",
          review: [
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 5
            },
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f66",
              rating: 5
            },
            {
              comment: "",
              difficulty: 3,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            },
            {
              comment: "",
              difficulty: 2,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            }
          ],
          select_days: [
            {
              _id: "5cd259c7108062000bad53a8",
              created_at: "Wed, 08 May 2019 04:23:35 GMT",
              highlight: "",
              report:
                "#standup\nworking on TMS\nworking on weekly report review page",
              task_completed: false,
              task_not_completed_reason: "",
              type: "daily",
              user: "5ccaf82b977b64000b775f61"
            }
          ],
          team: "ReactJs",
          type: "weekly",
          user: "5ccaf82b977b64000b775f61",
          username: "Aditi"
        },
        {
          _id: "5cd2b27243ea5f000a05e1e7",
          created_at: "Fri, 03 May 2019 10:41:54 GMT",
          cron_checkin: true,
          cron_recent_activity: false,
          difficulty: 4,
          extra:
            "Any extra work/ feedback/issues which you want to bring to the notice of manager",
          is_reviewed: [
            {
              _id: "5ccaf82b977b64000b775f63",
              job_title: "CEO",
              reviewed: false,
              username: "Manish Prakash",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f62",
              job_title: "Jr. Web Developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-03/613879164738_f4845bfbe967ffe718c1_192.jpg",
              reviewed: true,
              username: "Nidhi Sharma",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f66",
              job_title: "Web developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-06/626473809300_6a866cd476a701c0525b_192.jpg",
              reviewed: true,
              username: "Devkant",
              weight: 1
            }
          ],
          jobtitle: "Jr. Web Developer",
          k_highlight: {
            kpi: "Able to manage team members and guide them",
            kra: "able learn teck stack and deliver"
          },
          profileImage:
            "https://avatars.slack-edge.com/2019-05-03/618964391329_c1b6a13b36ad9fe96c3c_192.jpg",
          review: [
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 5
            },
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f66",
              rating: 5
            },
            {
              comment: "",
              difficulty: 3,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            },
            {
              comment: "",
              difficulty: 2,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            }
          ],
          select_days: [
            {
              _id: "5cd259c7108062000bad53a8",
              created_at: "Wed, 08 May 2019 04:23:35 GMT",
              highlight: "",
              report:
                "#standup\nworking on TMS\nworking on weekly report review page",
              task_completed: false,
              task_not_completed_reason: "",
              type: "daily",
              user: "5ccaf82b977b64000b775f61"
            }
          ],
          team: "ReactJs",
          type: "weekly",
          user: "5ccaf82b977b64000b775f61",
          username: "Aditi"
        },
        {
          _id: "5cd2b27243ea5f000a05e1e7",
          created_at: "Fri, 03 May 2019 10:41:54 GMT",
          cron_checkin: true,
          cron_recent_activity: false,
          difficulty: 2,
          extra:
            "Any extra work/ feedback/issues which you want to bring to the notice of manager",
          is_reviewed: [
            {
              _id: "5ccaf82b977b64000b775f63",
              job_title: "CEO",
              reviewed: false,
              username: "Manish Prakash",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f62",
              job_title: "Jr. Web Developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-03/613879164738_f4845bfbe967ffe718c1_192.jpg",
              reviewed: true,
              username: "Nidhi Sharma",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f66",
              job_title: "Web developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-06/626473809300_6a866cd476a701c0525b_192.jpg",
              reviewed: true,
              username: "Devkant",
              weight: 1
            }
          ],
          jobtitle: "Jr. Web Developer",
          k_highlight: {
            kpi:
              "able to contribute ideas/new technology to team via slack and other channel",
            kra: "able to talk to client and handle client on his own"
          },
          profileImage:
            "https://avatars.slack-edge.com/2019-05-03/618964391329_c1b6a13b36ad9fe96c3c_192.jpg",
          review: [
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 5
            },
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f66",
              rating: 5
            },
            {
              comment: "",
              difficulty: 3,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            },
            {
              comment: "",
              difficulty: 2,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            }
          ],
          select_days: [
            {
              _id: "5cd259c7108062000bad53a8",
              created_at: "Wed, 08 May 2019 04:23:35 GMT",
              highlight: "",
              report:
                "#standup\nworking on TMS\nworking on weekly report review page",
              task_completed: false,
              task_not_completed_reason: "",
              type: "daily",
              user: "5ccaf82b977b64000b775f61"
            }
          ],
          team: "ReactJs",
          type: "weekly",
          user: "5ccaf82b977b64000b775f61",
          username: "Aditi"
        },
        {
          _id: "5cd2b27243ea5f000a05e1e7",
          created_at: "Fri, 03 May 2019 10:41:54 GMT",
          cron_checkin: true,
          cron_recent_activity: false,
          difficulty: 1,
          extra:
            "Any extra work/ feedback/issues which you want to bring to the notice of manager",
          is_reviewed: [
            {
              _id: "5ccaf82b977b64000b775f63",
              job_title: "CEO",
              reviewed: false,
              username: "Manish Prakash",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f62",
              job_title: "Jr. Web Developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-03/613879164738_f4845bfbe967ffe718c1_192.jpg",
              reviewed: true,
              username: "Nidhi Sharma",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f66",
              job_title: "Web developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-06/626473809300_6a866cd476a701c0525b_192.jpg",
              reviewed: true,
              username: "Devkant",
              weight: 1
            }
          ],
          jobtitle: "Jr. Web Developer",
          k_highlight: {
            kpi: "able learn teck stack and deliver",
            kra: "Able to manage team members and guide them"
          },
          profileImage:
            "https://avatars.slack-edge.com/2019-05-03/618964391329_c1b6a13b36ad9fe96c3c_192.jpg",
          review: [
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 5
            },
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f66",
              rating: 5
            },
            {
              comment: "",
              difficulty: 3,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            },
            {
              comment: "",
              difficulty: 2,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            }
          ],
          select_days: [
            {
              _id: "5cd259c7108062000bad53a8",
              created_at: "Wed, 08 May 2019 04:23:35 GMT",
              highlight: "",
              report:
                "#standup\nworking on TMS\nworking on weekly report review page",
              task_completed: false,
              task_not_completed_reason: "",
              type: "daily",
              user: "5ccaf82b977b64000b775f61"
            }
          ],
          team: "ReactJs",
          type: "weekly",
          user: "5ccaf82b977b64000b775f61",
          username: "Aditi"
        },
        {
          _id: "5cd2b27243ea5f000a05e1e7",
          created_at: "Fri, 03 May 2019 10:41:54 GMT",
          cron_checkin: true,
          cron_recent_activity: false,
          difficulty: 5,
          extra:
            "Any extra work/ feedback/issues which you want to bring to the notice of manager",
          is_reviewed: [
            {
              _id: "5ccaf82b977b64000b775f63",
              job_title: "CEO",
              reviewed: false,
              username: "Manish Prakash",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f62",
              job_title: "Jr. Web Developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-03/613879164738_f4845bfbe967ffe718c1_192.jpg",
              reviewed: true,
              username: "Nidhi Sharma",
              weight: 1
            },
            {
              _id: "5ccaf82b977b64000b775f66",
              job_title: "Web developer",
              profileImage:
                "https://avatars.slack-edge.com/2019-05-06/626473809300_6a866cd476a701c0525b_192.jpg",
              reviewed: true,
              username: "Devkant",
              weight: 1
            }
          ],
          jobtitle: "Jr. Web Developer",
          k_highlight: {
            kpi: "Able to manage team members and guide them",
            kra:
              "Good expertise in tech stack and able to easy learn/adapt new things without much help"
          },
          profileImage:
            "https://avatars.slack-edge.com/2019-05-03/618964391329_c1b6a13b36ad9fe96c3c_192.jpg",
          review: [
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 5
            },
            {
              comment: "ok",
              difficulty: 5,
              manager_id: "5ccaf82b977b64000b775f66",
              rating: 5
            },
            {
              comment: "",
              difficulty: 3,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            },
            {
              comment: "",
              difficulty: 2,
              manager_id: "5ccaf82b977b64000b775f62",
              rating: 3
            }
          ],
          select_days: [
            {
              _id: "5cd259c7108062000bad53a8",
              created_at: "Wed, 08 May 2019 04:23:35 GMT",
              highlight: "",
              report:
                "#standup\nworking on TMS\nworking on weekly report review page",
              task_completed: false,
              task_not_completed_reason: "",
              type: "daily",
              user: "5ccaf82b977b64000b775f61"
            }
          ],
          team: "ReactJs",
          type: "weekly",
          user: "5ccaf82b977b64000b775f61",
          username: "Aditi"
        }
      ]
    };
  },
  components: {
    starRating: starRating,
    ExtraWorkFeedback: ExtraWorkFeedback
  },
  methods: {
    submit() {
      alert(
        `Star rating: ${this.ratedStar},
        Comment: ${this.text},
        UserId: ${this.$props.activeId}`
      );
      this.text = "";
      this.ratedStar = 1;
    },
    submitStarRate(value) {
      this.ratedStar = value;
    }
  }
};
</script>

<style src="./../monthlyPerformanceReview.scss" lang="scss">
</style>
