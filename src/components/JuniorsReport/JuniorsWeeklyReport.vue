<template>
  <div>
      <ul class="timeline">
      <!-- :class="{onLeft: (junior.reviewedByUser ? true : false) }" -->
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
          <!-- :class="junior.reviewedByUser  ?  'glyphicon-duplicate' : 'glyphicon-comments'" -->
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
          <p class="fs-sm text-muted">{{ junior.created_at | moment }}</p>
          <div v-if="junior.k_highlight && !junior.k_highlight.length">
            <p v-if="junior.k_highlight.kra || junior.k_highlight.KpiEra">
              <strong>For Kpi/Kra :</strong>
              &nbsp;{{junior.k_highlight.kra ? junior.k_highlight.kra : junior.k_highlight.KpiEra}}
            </p>
            <p class="fs-mini text-custom white-space-pre">
              <strong>Highlight : &nbsp;</strong>
              {{ junior.k_highlight.kpi ? junior.k_highlight.kpi : junior.k_highlight.description}}
            </p>
          </div>
          <div v-if="junior.k_highlight && junior.k_highlight.length">
            <div v-for="KpiEraWOrk in junior.k_highlight" :key="KpiEraWOrk._id" class="shadow-sm">
              <p class="pl-2">
                <strong>For Kpi/Kra :</strong>
                &nbsp;{{KpiEraWOrk.KpiEra}}
              </p>
              <p class="fs-mini text-custom white-space-pre pl-2">
                <strong>Highlight : &nbsp;</strong>
                {{ KpiEraWOrk.description }}
              </p>
            </div>
          </div>
          <p class="fs-mini white-space-pre pl-2">
            <strong>Extra Work : &nbsp;</strong>
            {{ junior.extra }}
          </p>
          <div class="starClass">
            <strong>Difficulty Level : &nbsp;</strong>
            <Stars
              :displayStar="5"
              :ratedStar="Number(junior.difficulty)"
              :starSize="'15px'"
              :disableStar="false"
            />
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
                  <p class="mb-0">{{ comment.comment }}</p>
                  <!-- <div class="starClass">
                    <strong>Difficulty : &nbsp;</strong>
                    <Stars
                      :displayStar="10"
                      :ratedStar="comment.difficulty"
                      :starSize="'15px'"
                      :disableStar="false"
                    />
                  </div> -->
                  <div class="starClass">
                    <strong>Overall Rating : &nbsp;</strong>
                    <Stars
                      :displayStar="10"
                      :ratedStar="comment.rating"
                      :starSize="'12px'"
                      :disableStar="false"
                    />
                  </div>
                </div>
              </li>
              <div v-if="junior.skip_reason && junior.skip_reason.length">
                <li v-for="(reason, index) in junior.skip_reason" :key="index" class="mb-3">
                  <div class="comment-body bg-warning px-2 py-1">
                    <p class="mb-0">
                      <span class="ml-5 font-weight-bold">Skipped :</span>
                      {{ reason }}
                    </p>
                  </div>
                </li>
              </div>
            </ul>
            <div
              class="text-danger"
              v-else
            >Put in your weekly report, before seeing other managers review!</div>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    name:"juniorsWeekly"
}
</script>