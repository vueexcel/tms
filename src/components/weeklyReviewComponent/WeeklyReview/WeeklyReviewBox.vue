



<template>
    <div>
        <b-row class=" pb-5">
            <b-col xs="12" sm="6" class="rounded-left first-box">
                <b-btn v-b-toggle="'collapse2'" class="m-1 mt-2 collapse-Button h2">KPI</b-btn>
                 <b-collapse id="collapse2">
                     <b-container>
                        <div class="mt-2">
                            <span class="bold-text">First Human Colony on Mars</span>
                            <h6>First 700 people will take part in building first human settlement outside of earth.Thats awesome right</h6>
                        </div>
                        <div class="border-top text-light"></div>
                        <div class="mt-2">
                            <span class="bold-text">First Human Colony on Mars</span>
                            <h6>First 700 people will take part in building first human settlement outside of earth.Thats awesome right</h6>
                        </div>
                     </b-container>
                </b-collapse>
                <b-btn v-b-toggle="'collapse3'" class="m-1 collapse-Button">ERA</b-btn>
                 <b-collapse id="collapse3">
                     <b-container>
                        <div class="mt-2">
                            <span class="bold-text">First Human Colony on Mars</span>
                            <h6>First 700 people will take part in building first human settlement outside of earth.Thats awesome right</h6>
                        </div>
                        <div class="border-top text-light"></div>
                        <div class="mt-2">
                            <span class="bold-text">First Human Colony on Mars</span>
                            <h6>First 700 people will take part in building first human settlement outside of earth.Thats awesome right</h6>
                        </div>
                     </b-container>
                </b-collapse>
                    <div class="mt-2">
                        <div class="Feedback pb-2 mt-4 pl-3">Extra work/ Feedback/ Issues</div>
                        <h6 class="ml-4 pt-3">Worked on xSpaces</h6>
                    </div>
                    <div>
                        <div class="Feedback mt-4 pb-2 pl-3">Highlight Check-in</div>
                        <h6 class="ml-3 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h6>
                    </div>
                    <div>
                        <div class="Feedback mt-4 pb-2 pl-3">Project Difficulty Level</div>
                        <div class="text-dark ml-3 mb-5 mt-2">
                            <h2>
                                <i class="fa fa-star mr-xs" />
                                <i class="fa fa-star mr-xs" />
                                <i class="fa fa-star mr-xs" />
                                <i class="fa fa-star mr-xs" />
                                <i class="fa fa-star" />
                            </h2>
                        </div>
                    </div>
            </b-col>
            <b-col xs="12" sm="6" class="rounded-right">
                <b-alert show class="Alert-class mt-3">Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
                <div class="mb-3">
                    <h6 class="rating-header mb-2">Overall Rating</h6>
                    <div class='border-top'></div>
                    <div class="mt-2 font-weight">Based on Weekly Review</div>
                </div>
                <starRating class="border-bottom" @starRating="starRatingValue"/>
                <div class="mt-2 font-weight">Difficulty level of Project (if project work you did was difficult/required more effort)</div>
                <starRating class="border-bottom" @starRating="starRatingValue"/>
                <div sm="6">
                    <h6 class="text-inverse">Comments</h6>
                </div>
                <b-form>
                    <b-form-textarea :rows="3" v-model="text" id="default-textarea" placeholder="Performance or general comments (if any)..."/>
                    <b-button variant="primary" class="width-100 mb-xs mr-xs mt-4" @click="submit">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import starRating from '@/components/Star/Star'
export default {
 name: 'PerformanceBox',
 data () {
    return {
        text:'',
        voting: null
    }
 },
 components: {
    starRating
 },
 methods:{
    submit() {
        this.text = ''
    },
    starRatingValue(value) {
        this.voting = value
    }
 }
}
</script>

<style src="./../WeeklyReview.scss" lang="scss">

</style>
