<template>
  <div>
    <ul class="timeline">
      <li
        v-for="( junior, index ) in juniorReport.slice().reverse()"
        :key="index"
        :class="{onLeft: index %2===0 }"
      >
        <time class="eventTime" datetime="2014-05-19 03:04">
          <span class="date">{{ junior.created_at | day }}</span>
          <span class="time">{{ junior.created_at | time }}</span>
        </time>
        <span class="eventIcon" :class="junior.review ?  'eventIconPrimary' : 'eventIconSuccess'">
          <i
            class="glyphicon"
            :class="junior.review  ?  'glyphicon-duplicate' : 'glyphicon-comments'"
          />
        </span>

        <section class="event">
          <span class="thumb-xs avatar pull-left mr-sm">
            <img
              class="rounded-circle"
              :src="junior.user.profileImage ? junior.user.profileImage: image"
              alt="..."
            />
          </span>
          <h5 class="eventHeading">
            <a class="text-primary">{{ junior.user.name }}</a>
          </h5>
          <div>
            <p class="fs-sm text-muted">Month: {{ junior.month }}</p>
            <div>
              KPI
              <hr />
              <div v-for="(kpi, index) in junior.report.kpi" :key="index">
                <p class="text-primary fw-semi-bold">{{ kpi.title }}</p>
                <p class="text-secondary">{{ kpi.desc }}</p>
                <p>
                  <span class="text-monospace">Report:</span>
                </p>
                <div class="dialogbox">
                  <div class="body">
                    <span class="tip tip-up"></span>
                    <div class="message text-primary">
                      <span>{{ kpi.comment }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              ERA
              <hr />
              <div v-for="(era, index) in junior.report.era" :key="index">
                <p class="text-primary fw-semi-bold">{{ era.title }}</p>
                <p class="text-secondary">{{ era.desc }}</p>
                <p v-if="era.comment">
                  <span class="text-monospace">Report:</span>
                </p>
                <div v-if="era.comment" class="dialogbox">
                  <div class="body">
                    <span class="tip tip-up"></span>
                    <div class="message text-primary">
                      <span>{{ era.comment }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="eventFooter pt-0">
              <ul class="post-comments" v-if="junior.review">
                <li v-for="(comment, index) in junior.review" :key="index">
                  <span class="thumb-xs avatar pull-left mr-sm">
                    <img
                      class="rounded-circle"
                      :src="comment.manager_id.profileImage ? comment.manager_id.profileImage: image"
                      alt="..."
                    />
                  </span>
                  <div class="comment-body">
                    <h6 class="author fs-sm fw-semi-bold">{{ comment.manager_id.name }}</h6>
                    <div>
                      KPI
                      <hr />
                      <div v-for="(kpi, index) in comment.comment.kpi" :key="index">
                        <p class="text-primary fw-semi-bold">Kpi title: {{ kpi.title }}</p>
                        <p class>Comment:</p>
                        <div class="dialogbox">
                          <div class="body">
                            <span class="tip tip-up"></span>
                            <div class="message">
                              <span>{{ kpi.comment }}</span>
                            </div>
                          </div>
                        </div>
                        <p>
                          Rating:
                          <Stars
                            :displayStar="10"
                            :ratedStar="kpi.rating"
                            :starSize="'13px'"
                            :disableStar="false"
                          />
                        </p>
                      </div>
                    </div>
                    <div>
                      ERA
                      <hr />
                      <div v-for="(kpi, index) in comment.comment.era" :key="index">
                        <p class="text-primary fw-semi-bold">Era title: {{ kpi.title }}</p>
                        <p v-if="kpi.comment">Comment:</p>
                        <div v-if="kpi.comment" class="dialogbox">
                          <div class="body">
                            <span class="tip tip-up"></span>
                            <div class="message">
                              <span>{{ kpi.comment }}</span>
                            </div>
                          </div>
                        </div>
                        <p>
                          Rating:
                          <Stars
                            :displayStar="10"
                            :ratedStar="kpi.rating"
                            :starSize="'13px'"
                            :disableStar="false"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="text-danger"
                v-else
              >Put in your monthly review, before seeing other managers review!</div>
            </footer>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "juniorsReport",
  props: {
    juniorReport: { type: Array }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM DD YYYY [at] hh:mm a");
    },
    time: function(time) {
      return moment(time).format("hh:mm a");
    },
    day: function(day) {
      return moment(day).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "MMMM DD,YYYY",
        sameElse: "MMMM DD,YYYY"
      });
    }
  }
};
</script>

<style src="@/pages/ViewCheckin/Timeline.scss" lang="scss" scoped />