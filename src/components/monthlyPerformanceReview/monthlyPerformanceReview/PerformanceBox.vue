<template>
  <div>
    <b-row class="shadow">
      <b-col xs="12" sm="6" class="bg-warning rounded-left">
        <ExtraWorkFeedback :data="data[activeId]" :variant="'text-warning'"/>
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
        <starRating
          :variantWarning="false"
          :displayStar="5"
          :ratedStar="ratedStar"
          @starRatingSelected="submitStarRate"
        />
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
      data: [
        {
          widgetColor: "bg-warning rounded-left",
          kpi: [
            {
              heading: "Multiple Projects",
              content: "able to effectively handle multiple projects"
            },
            {
              heading: "Tech Stack",
              content:
                "Good expertise in tech stack and able to easy learn/adapt new things without much help"
            }
          ],
          era: [
            {
              heading: "First Human Colony on Mars",
              content:
                "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
            },
            {
              heading: "CLIENT HANDLING",
              content: "able to talk to client and handle client on his own"
            }
          ],
          extraWork: "Worked on Xspaces",
          highlightCheckin:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          difficulty: 4
        },
        {
          widgetColor: "bg-warning rounded-left",
          kpi: [
            {
              heading: "Tech Slack",
              content:
                "Good expertise in tech stack and able to easy learn/adapt new things without much help"
            },
            {
              heading: "Client Handling",
              content: "able to effectively handle clients"
            }
          ],
          era: [
            {
              heading: "MANAGE TEAMS",
              content: "Able to manage team members and guide them"
            },
            {
              heading: "TEAM CONTRIBUTION",
              content:
                "able to contribute ideas/new technology to team via slack and other channel"
            }
          ],
          extraWork: "Worked on Xspaces",
          highlightCheckin:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          difficulty: 3
        },
        {
          widgetColor: "bg-warning rounded-left",
          kpi: [
            {
              heading: "Client Handling",
              content:
                "Good expertise in tech stack and able to easy learn/adapt new things without much help"
            },
            {
              heading: "Tech Stack",
              content: "able to effectively handle clients"
            }
          ],
          era: [
            {
              heading: "MANAGE TEAMS",
              content: "Able to manage team members and guide them"
            },
            {
              heading: "TEAM CONTRIBUTION",
              content:
                "able to contribute ideas/new technology to team via slack and other channel"
            }
          ],
          extraWork: "Worked on Xspaces",
          highlightCheckin:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          difficulty: 2
        },
        {
          widgetColor: "bg-warning rounded-left",
          kpi: [
            {
              heading: "Tech Slack",
              content:
                "Good expertise in tech stack and able to easy learn/adapt new things without much help"
            },
            {
              heading: "Client Handling",
              content: "able to effectively handle clients"
            }
          ],
          era: [
            {
              heading: "MANAGE TEAMS",
              content: "Able to manage team members and guide them"
            },
            {
              heading: "TEAM CONTRIBUTION",
              content:
                "able to contribute ideas/new technology to team via slack and other channel"
            }
          ],
          extraWork: "Worked on Xspaces",
          highlightCheckin:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          difficulty: 1
        },
        {
          widgetColor: "bg-warning rounded-left",
          kpi: [
            {
              heading: "Tech Slack",
              content:
                "Good expertise in tech stack and able to easy learn/adapt new things without much help"
            },
            {
              heading: "Client Handling",
              content: "able to effectively handle clients"
            }
          ],
          era: [
            {
              heading: "MANAGE TEAMS",
              content: "Able to manage team members and guide them"
            },
            {
              heading: "TEAM CONTRIBUTION",
              content:
                "able to contribute ideas/new technology to team via slack and other channel"
            }
          ],
          extraWork: "Worked on Xspaces",
          highlightCheckin:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          difficulty: 5
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
