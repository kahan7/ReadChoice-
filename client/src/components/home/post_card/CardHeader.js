import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import { Rate } from "antd";
const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };
  function findNumber(str) {
    const regex = /[-+]?[0-9]*\.?[0-9]+/g; // Biểu thức chính quy để tìm kiếm số thực hoặc số nguyên
    const matches = str.match(regex); // Tìm tất cả các chuỗi con khớp với biểu thức chính quy

    if (matches) {
      // Lặp qua các chuỗi con và chuyển đổi thành số
      for (let i = 0; i < matches.length; i++) {
        const number = isNaN(parseInt(matches[i]))
          ? parseFloat(matches[i])
          : parseInt(matches[i]);
        if (!isNaN(number)) {
          return number; // Nếu tìm thấy số, trả về giá trị đó
        }
      }
    }

    return null; // Nếu không tìm thấy số nào, trả về null
  }
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar
          src={post.user.avatar}
          size="w-10 h-10 rounded-full object-contain"
        />

        <div className="card_name">
          <div>
            <h6 className="m-0">
              <Link to={`/profile/${post.user._id}`} className="text-dark">
                {post.user.username}
              </Link>
            </h6>
          </div>
          <div>
            {post.status && post.status.includes("rate") ? (
              <>
                <span>
                  {post.status ? post.status.replace(/\d+/g, "") : null}{" "}
                </span>{" "}
                <Rate
                  disabled={true}
                  allowHalf={true}
                  defaultValue={findNumber(post.status)}
                />
              </>
            ) : (
              <span>{post.status} </span>
            )}

            <small className="text-muted">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
        </div>
      </div>

      <div className="nav-item dropdown">
        {auth.user._id === post.user._id && (
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>
        )}
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove
                Post
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
