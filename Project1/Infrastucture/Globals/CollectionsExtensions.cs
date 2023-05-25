namespace UrfuReview.Infrastucture.Globals
{
    public static class CollectionsExtensions
    {
        /// <summary>
        /// Returns <paramref name="count"/> items from <paramref name="origin"/> collection 
        /// </summary>
        /// <typeparam name="TItem">Any type</typeparam>
        /// <param name="origin">origin collection from which items taken</param>
        /// <param name="count">count of fetched items</param>
        /// <returns><see cref="IList{T}"/> with <paramref name="count"/> randomly fetched items </returns>
        /// <exception cref="ArgumentException">throws if <paramref name="count"/> less than zero or more than <paramref name="origin"/> items contains</exception>
        public static IEnumerable<TItem> FetchRandom<TItem>(this IList<TItem> origin, int count)
        {
            if (count < 0)
                throw new ArgumentException("Unable to fetch negative items cound from collection");

            if (count > origin.Count)
                throw new ArgumentException("Unable to fetch more items than given collection contains");

            return origin.OrderBy(x => Random.Shared.Next()).Take(count); 
        }
    }
}
