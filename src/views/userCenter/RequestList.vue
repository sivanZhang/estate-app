<template>
  <div id="RepairList" class="warp-pb">
    <goHome/>
    <van-nav-bar
      title="My Request"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="Create"
      @click-right="targetNewRequest"
    />
    <Search @onSearch="search" v-model="searchVal"/>
    <TabNav :activeKey="activeKey" :menuList="menuList" @tapChange="change"/>
    <template v-if="activeKey=='Repair'">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh(1)">
        <div v-show="AjaxData==''" class="text-center">No data.</div>
        <section
          class="container"
          v-for="(item,index) in AjaxData"
          :key="index"
          @click="$router.push({name:'RequestDetail',params:{rid:item.pk,query:item.fields.status}})"
        >
          <div class="date" v-text="item.fields.date"></div>
          <div class="detail">
            <div class="content">
              <div class="title">{{item.fields.code}}</div>
              <p>{{item.fields.facilities}}</p>
              <div class="time">{{item.fields.prefertime_start}} to {{item.fields.prefertime_end}}</div>
            </div>
            <div class="operation text-right">
              <div
                :class="[{ongoing:item.fields.status==1},{completed:item.fields.status==2},{cancel:item.fields.status==3},{draft:item.fields.status==0},{declined:item.fields.status==5},{accept:item.fields.status==4}]"
              >{{item.fields.status|FStatus}}</div>
              <template v-if="item.fields.status==1">
                <div class="draft">cancel</div>
              </template>
              <template v-else>
                <div class="text-right">
                  <img
                    class="delete-icon"
                    @click.stop="deleteRepair(item.pk)"
                    src="@/assets/icons/delete.png"
                    alt
                  >
                </div>
              </template>
            </div>
          </div>
        </section>
      </van-pull-refresh>
    </template>
    <template v-else-if="activeKey=='Parking'">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh(3)">
        <div v-show="ParkingData==''" class="text-center">No data.</div>
        <section
          class="container"
          v-for="(item,index) in ParkingData"
          :key="index"
          @click="$router.push({name:'ParkingDetail',params:{rid:item.pk,query:item.fields.status}})"
        >
          <div class="date" v-text="item.fields.date"></div>
          <div class="detail">
            <div class="content">
              <div class="title">{{item.fields.code}}</div>
              <p>{{item.fields.number}} Parking spots</p>
              <div class="time">
                {{item.fields.start.split(' ')[0]}}
                {{item.fields.end?` to ${item.fields.end.split(' ')[0]}`:''}}
              </div>
            </div>
            <div class="operation text-right">
              <div
                :class="[{ongoing:item.fields.status==0},{accept:item.fields.status==1},{declined:item.fields.status==2},{cancel:item.fields.status==3}]"
              >{{item.fields.status|PStatus}}</div>
              <template v-if="item.fields.status==0">
                <div class="draft">cancel</div>
              </template>
              <template v-else>
                <div class="text-right">
                  <img
                    class="delete-icon"
                    @click.stop="deleteParking(item.pk)"
                    src="@/assets/icons/delete.png"
                    alt
                  >
                </div>
              </template>
            </div>
          </div>
        </section>
      </van-pull-refresh>
    </template>
  </div>
</template>
<script>
import { GET_Repair, POST_Repair } from "@/api/repair";
import { GET_Parking, POST_Parking } from "@/api/paking";
import Ajax from "@/axios";
import Search from "@/components/search";
import TabNav from "@/components/tabNav";
export default {
  components: {
    Search,
    TabNav
  },
  data() {
    return {
      isLoading: false,
      searchVal: "",
      activeKey: "",
      AjaxData: [],
      ParkingData: [],
      menuList: [
        {
          name: "Repair",
          src: require("@/assets/icons/garage-wrenches-grey.png"),
          activeSrc: require("@/assets/icons/garage-wrenches.png")
        },
        {
          name: "Amenity",
          src: require("@/assets/icons/barbecue-grey.png"),
          activeSrc: require("@/assets/icons/barbecue.png")
        },
        {
          name: "Parking",
          src: require("@/assets/icons/parked-car-grey.png"),
          activeSrc: require("@/assets/icons/parked_car.png")
        }
      ]
    };
  },
  filters: {
    FDate(val) {
      let arr = new Date(val).toDateString().split(/\s/g);
      return `${arr[2]} ${arr[1]}`;
    },
    FTime(val) {
      return new Date(val).toLocaleTimeString();
    },
    FStatus(val) {
      switch (val) {
        case 0:
          return "Draft";
          break;
        case 1:
          return "Ongoing";
          break;
        case 2:
          return "Completed";
          break;
        case 3:
          return "Canceled";
          break;
        case 4:
          return "Accepted";
          break;
        case 5:
          return "Declined";
          break;
      }
    },
    PStatus(val) {
      switch (val) {
        case 0:
          return "Ongoing";
          break;
        case 1:
          return "Accepted";
          break;
        case 2:
          return "Declined";
          break;
        case 3:
          return "Canceled";
          break;
      }
    }
  },
  methods: {
    onRefresh(type) {
      const refresh = true;
      this.getAjax(type, refresh);
    },
    targetNewRequest() {
      if (this.activeKey == "Repair") {
        this.$router.push("/repair/request-repair");
      } else if (this.activeKey == "Parking") {
        this.$router.push("/Parking/ReserveParkingSpot");
      }
    },
    deleteParking(id) {
      this.$dialog
        .confirm({
          title: "Delete confirmation"
        })
        .then(() => {
          let data = {
            id,
            method: "delete"
          };
          POST_Parking(data).then(res => {
            if (res.data.status == "ok") {
              this.$toast.success(res.data.msg);
              this.getAjax();
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    deleteRepair(repair_id) {
      this.$dialog
        .confirm({
          title: "Delete confirmation"
        })
        .then(() => {
          let data = {
            repair_id,
            method: "delete"
          };
          POST_Repair(data).then(res => {
            if (res.data.status == "ok") {
              this.$toast.success(res.data.msg);
              this.getAjax();
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    change(name) {
      this.activeKey = name;
    },
    search() {
      if (!this.searchVal) {
        return;
      }
      let params = {
        code: this.searchVal
      };
      if (this.activeKey == "Repair") {
        GET_Repair(params).then(res => {
          this.AjaxData = [...res.data.msg];
        });
      } else if (this.activeKey == "Parking") {
        GET_Parking(params).then(res => {
          this.ParkingData = [...res.data.msg];
        });
      } else {
        return;
      }
    },
    getAjax(tab = 0, refresh = false) {
      if (tab == 1) {
        GET_Repair().then(res => {
          this.AjaxData = [...res.data.msg];
          if (refresh) {
            this.$toast("Refresh the success");
            this.isLoading = false;
          }
        });
      } else if (tab == 3) {
        GET_Parking().then(res => {
          this.ParkingData = [...res.data.msg];
          if (refresh) {
            this.$toast("Refresh the success");
            this.isLoading = false;
          }
        });
      } else {
        GET_Repair().then(res => {
          this.AjaxData = [...res.data.msg];
        });
        GET_Parking().then(res => {
          this.ParkingData = [...res.data.msg];
        });
      }
    }
  },
  created() {
    this.activeKey = this.$store.state.ListType || "Repair";
  },
  activated() {
    this.getAjax();
  }
};
</script>
<style lang="less" scoped>
#RepairList {
  position: relative;

  .text-center {
    text-align: center;
    padding: 0.3rem 0;
  }

  .ongoing {
    color: #f5a623;
  }

  .accept {
    color: #41b886;
  }

  .cancel {
    color: #e60404;
  }

  .draft {
    color: #c8c8cc;
  }

  .declined {
    color: #ed8482;
  }

  .completed {
    color: #7db8fd;
  }

  section {
    .detail {
      display: flex;
      justify-content: space-between;
      padding: 0.15rem;
      min-height: 1.02rem;
      border: 1px solid #ececec;
      box-shadow: 0 0.03rem 0.03rem rgba(200, 200, 204, 0.8);
      font-size: 0.13rem;

      .operation {
        flex: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        text-align: right;
      }

      .content {
        flex: 1;
        width: 0;
        font-size: 0.13rem;

        .title {
          font-weight: 600;
          font-size: 0.14rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .date {
      margin: 0.18rem 0 0.09rem;
      height: 0.21rem;
      line-height: 0.21rem;
      background-color: #fad87b;
      border-radius: 0.085rem;
      display: inline-block;
      padding: 0 6px;
      font-size: 0.12rem;
    }
  }
}
</style>